#!/usr/bin/env python3
"""
YouTube Stream Updater - Improved Version
Fetches YouTube stream URLs and updates m3u8 playlists
Enhanced with better JS challenge handling and error recovery
"""

import json
import os
import sys
import argparse
import time
import re
from pathlib import Path
from urllib.parse import urlencode, urlparse, parse_qs

# Try to import cloudscraper first (best option)
try:
    import cloudscraper
    CLOUDSCRAPER_AVAILABLE = True
except ImportError:
    CLOUDSCRAPER_AVAILABLE = False

# Try to import curl_cffi (alternative for tough challenges)
try:
    from curl_cffi import requests as curl_requests
    CURL_CFFI_AVAILABLE = True
except ImportError:
    CURL_CFFI_AVAILABLE = False

# Fallback to standard requests
import requests

# Configuration
ENDPOINT = os.environ.get('ENDPOINT', 'https://your-endpoint.com')
FOLDER_NAME = os.environ.get('FOLDER_NAME', 'streams')
TIMEOUT = 30
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds
VERBOSE = False

def create_session():
    """Create the best available HTTP session"""
    if CLOUDSCRAPER_AVAILABLE:
        print("✓ Using enhanced cloudscraper for JavaScript challenge bypass")
        
        # Use the zinzied/cloudscraper enhanced fork features
        try:
            scraper = cloudscraper.create_scraper(
                browser='chrome',
                debug=False,
                # Enhanced bypass features (zinzied fork)
                enable_tls_fingerprinting=True,
                enable_tls_rotation=True,
                enable_anti_detection=True,
                enable_enhanced_spoofing=True,
                spoofing_consistency_level='medium',
                enable_intelligent_challenges=True,
                enable_adaptive_timing=True,
                behavior_profile='focused',  # casual, focused, research, mobile
                enable_ml_optimization=True,
                enable_enhanced_error_handling=True,
                # Stealth mode
                enable_stealth=True,
                stealth_options={
                    'min_delay': 1.5,
                    'max_delay': 4.0,
                    'human_like_delays': True,
                    'randomize_headers': True,
                    'browser_quirks': True,
                    'simulate_viewport': True,
                    'behavioral_patterns': True
                },
                # Session management
                session_refresh_interval=3600,
                auto_refresh_on_403=True,
                max_403_retries=3
            )
            print("  → Enhanced features enabled: TLS fingerprinting, anti-detection, ML optimization")
            return scraper, 'cloudscraper-enhanced'
        except TypeError:
            # Fallback to basic cloudscraper if enhanced features not available
            print("  → Using basic cloudscraper (enhanced fork not detected)")
            scraper = cloudscraper.create_scraper(
                browser={
                    'browser': 'chrome',
                    'platform': 'windows',
                    'mobile': False
                },
                delay=10
            )
            return scraper, 'cloudscraper-basic'
    elif CURL_CFFI_AVAILABLE:
        print("✓ Using curl_cffi for advanced challenge bypass")
        # curl_cffi uses a different interface
        return None, 'curl_cffi'
    else:
        print("⚠ Using basic requests (limited challenge support)")
        print("⚠ Install cloudscraper: pip install cloudscraper")
        print("⚠ Or install curl_cffi: pip install curl_cffi")
        session = requests.Session()
        adapter = requests.adapters.HTTPAdapter(
            pool_connections=10,
            pool_maxsize=20,
            max_retries=0
        )
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        return session, 'requests'

# Initialize session
session, session_type = create_session()


def load_config(config_path):
    """Load configuration from JSON file"""
    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
        print(f"✓ Loaded {len(config)} stream(s) from config")
        return config
    except FileNotFoundError:
        print(f"✗ Config file not found: {config_path}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"✗ Invalid JSON in config file: {e}")
        sys.exit(1)


def extract_redirect_url(html_content):
    """Extract redirect URL from JavaScript challenge page"""
    # Pattern 1: location.href = "url"
    patterns = [
        r'location\.href\s*=\s*["\']([^"\']+)["\']',
        r'window\.location\s*=\s*["\']([^"\']+)["\']',
        r'window\.location\.href\s*=\s*["\']([^"\']+)["\']',
        # Pattern 2: location.replace("url")
        r'location\.replace\s*\(\s*["\']([^"\']+)["\']\s*\)',
        # Pattern 3: meta refresh
        r'<meta[^>]+http-equiv=["\']refresh["\'][^>]+content=["\'][^;]+;\s*url=([^"\']+)["\']',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, html_content, re.IGNORECASE)
        if match:
            return match.group(1)
    
    return None


def extract_challenge_cookies(html_content):
    """Extract cookies set by JavaScript challenge"""
    cookies = {}
    
    # Look for document.cookie patterns
    cookie_patterns = [
        r'document\.cookie\s*=\s*["\']([^"\']+)["\']',
        r'document\.cookie\s*=\s*([^;]+);',
    ]
    
    for pattern in cookie_patterns:
        matches = re.finditer(pattern, html_content)
        for match in matches:
            cookie_str = match.group(1)
            # Parse cookie string (name=value format)
            if '=' in cookie_str:
                parts = cookie_str.split('=', 1)
                if len(parts) == 2:
                    cookies[parts[0].strip()] = parts[1].strip()
    
    return cookies


def solve_js_challenge_advanced(response, slug, base_url):
    """Detect and solve JavaScript challenge with multiple strategies"""
    content = response.text
    
    # Check if this is a JS challenge page
    challenge_indicators = [
        '<script type="text/javascript" src="/aes.js"',
        'slowAES.decrypt',
        'Checking your browser',
        'Just a moment',
        'Please wait',
        'Verifying you are human'
    ]
    
    is_challenge = any(indicator in content for indicator in challenge_indicators)
    
    if is_challenge:
        print(f"  ⚠ JavaScript/Anti-bot challenge detected")
        
        # Strategy 1: Extract redirect URL
        redirect_url = extract_redirect_url(content)
        if redirect_url:
            print(f"  → Strategy 1: Found redirect URL")
            # Handle relative URLs
            if redirect_url.startswith('/'):
                parsed = urlparse(base_url)
                redirect_url = f"{parsed.scheme}://{parsed.netloc}{redirect_url}"
            elif not redirect_url.startswith('http'):
                redirect_url = f"{base_url.rstrip('/')}/{redirect_url}"
            
            return {
                'type': 'redirect',
                'url': redirect_url,
                'cookies': extract_challenge_cookies(content)
            }
        
        # Strategy 2: Extract cookies and retry original URL
        cookies = extract_challenge_cookies(content)
        if cookies:
            print(f"  → Strategy 2: Found {len(cookies)} challenge cookie(s)")
            return {
                'type': 'cookies',
                'url': base_url,
                'cookies': cookies
            }
        
        # Strategy 3: Look for hidden form submission
        form_match = re.search(r'<form[^>]+action=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if form_match:
            form_action = form_match.group(1)
            if form_action.startswith('/'):
                parsed = urlparse(base_url)
                form_action = f"{parsed.scheme}://{parsed.netloc}{form_action}"
            print(f"  → Strategy 3: Found form action")
            return {
                'type': 'form',
                'url': form_action,
                'cookies': {}
            }
        
        print(f"  ✗ Could not extract challenge solution")
        if VERBOSE:
            print(f"  → Content preview:\n{content[:500]}")
    
    return None


def make_request(url, timeout, headers, cookies=None, referer=None):
    """Make HTTP request using the best available method"""
    final_headers = headers.copy()
    if referer:
        final_headers['Referer'] = referer
    
    if session_type == 'curl_cffi':
        # Use curl_cffi for tough challenges
        response = curl_requests.get(
            url,
            timeout=timeout,
            headers=final_headers,
            cookies=cookies,
            impersonate="chrome120",
            allow_redirects=True
        )
        return response
    else:
        # Use cloudscraper or requests
        response = session.get(
            url,
            timeout=timeout,
            headers=final_headers,
            cookies=cookies,
            allow_redirects=True
        )
        return response


def fetch_stream_url_with_retry(stream_config):
    """Fetch stream URL with retry logic"""
    slug = stream_config['slug']
    last_error_type = None
    
    for attempt in range(1, MAX_RETRIES + 1):
        if attempt > 1:
            delay = RETRY_DELAY * (2 ** (attempt - 2))  # Exponential backoff
            print(f"  → Retry {attempt}/{MAX_RETRIES} after {delay}s delay...")
            time.sleep(delay)
        
        result, error_type = fetch_stream_url(stream_config, attempt)
        if result is not None:
            return result, None
        
        last_error_type = error_type
        if attempt < MAX_RETRIES:
            print(f"  → Attempt {attempt} failed, will retry...")
    
    print(f"  ✗ All {MAX_RETRIES} attempts failed for {slug}")
    return None, last_error_type


def fetch_stream_url(stream_config, attempt_num=1):
    """Fetch the YouTube stream m3u8 URL"""
    stream_type = stream_config.get('type', 'channel')
    stream_id = stream_config['id']
    slug = stream_config['slug']
    
    # Build query string based on type
    if stream_type == 'video':
        query_param = 'v'
    elif stream_type == 'channel':
        query_param = 'c'
    else:
        print(f"✗ Unknown type '{stream_type}' for {slug}")
        return None, 'InvalidType'
    
    # Build request URL
    url = f"{ENDPOINT}/yt.php?{query_param}={stream_id}"
    
    print(f"  Fetching: {url}")
    
    try:
        # Prepare headers
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
        
        print(f"  → Sending GET request (timeout={TIMEOUT}s, attempt={attempt_num})...")
        
        # Make initial request
        response = make_request(url, TIMEOUT, headers)
        
        # Log response details
        print(f"  → Status Code: {response.status_code}")
        print(f"  → Content Type: {response.headers.get('Content-Type', 'N/A')}")
        print(f"  → Content Length: {len(response.content)} bytes")
        
        # Log redirect chain if any
        if hasattr(response, 'history') and response.history:
            print(f"  → Redirects: {len(response.history)} redirect(s)")
            for i, hist_resp in enumerate(response.history, 1):
                print(f"    {i}. {hist_resp.status_code} → {hist_resp.url}")
            print(f"  → Final URL: {response.url}")
        
        response.raise_for_status()
        
        # Check if we got a challenge page
        challenge_solution = solve_js_challenge_advanced(response, slug, url)
        
        if challenge_solution:
            solution_type = challenge_solution['type']
            target_url = challenge_solution['url']
            challenge_cookies = challenge_solution['cookies']
            
            print(f"  → Attempting to solve challenge (type: {solution_type})...")
            
            # Wait a bit before following (simulate human behavior)
            time.sleep(2)
            
            # Merge any cookies from the challenge
            request_cookies = dict(response.cookies)
            if challenge_cookies:
                request_cookies.update(challenge_cookies)
            
            # Make follow-up request
            print(f"  → Following challenge solution to: {target_url}")
            response2 = make_request(
                target_url,
                TIMEOUT,
                headers,
                cookies=request_cookies if request_cookies else None,
                referer=url
            )
            
            print(f"  → Second request status: {response2.status_code}")
            print(f"  → Content Length: {len(response2.content)} bytes")
            print(f"  → Content Type: {response2.headers.get('Content-Type', 'N/A')}")
            
            response2.raise_for_status()
            
            # Check if we still have a challenge
            second_challenge = solve_js_challenge_advanced(response2, slug, target_url)
            if second_challenge:
                print(f"  ✗ Still facing challenge after solution attempt")
                return None, 'ChallengeFailed'
            
            response = response2  # Use the second response
        
        # Check if content looks like m3u8
        content_preview = response.text[:200] if len(response.text) > 200 else response.text
        
        if '#EXTM3U' in content_preview:
            print(f"  ✓ Valid m3u8 content detected")
            return response.text, None
        elif '<html' in content_preview.lower() or '<!doctype' in content_preview.lower():
            print(f"  ✗ Error: Received HTML instead of m3u8")
            if VERBOSE:
                print(f"  → Content preview: {content_preview[:300]}...")
            
            # Check if it's still a challenge page
            if any(indicator in response.text for indicator in ['Checking your browser', 'Just a moment', 'cloudflare']):
                return None, 'ChallengeNotSolved'
            
            return None, 'HTMLResponse'
        else:
            print(f"  ⚠ Warning: Content doesn't start with #EXTM3U")
            if VERBOSE:
                print(f"  → Content preview: {content_preview[:150]}...")
            
            # If content looks like it might be m3u8 without the header, try to use it
            if '.m3u8' in content_preview or 'EXT-X-' in content_preview:
                print(f"  ⚠ Content might be valid m3u8 despite missing header")
                return response.text, None
            
            return None, 'InvalidContent'
        
    except requests.exceptions.Timeout:
        error_type = 'Timeout'
        print(f"  ✗ Timeout error for {slug}: Request exceeded {TIMEOUT}s")
        return None, error_type
    except requests.exceptions.ConnectionError as e:
        error_type = 'ConnectionError'
        print(f"  ✗ Connection error for {slug}")
        if VERBOSE:
            print(f"  → Error details: {e}")
        return None, error_type
    except requests.exceptions.HTTPError as e:
        error_type = f'HTTPError-{e.response.status_code}'
        print(f"  ✗ HTTP error for {slug}: {e.response.status_code}")
        if VERBOSE:
            print(f"  → Response: {e.response.text[:200] if e.response.text else 'No content'}")
        return None, error_type
    except Exception as e:
        error_type = type(e).__name__
        print(f"  ✗ Request error for {slug}: {type(e).__name__}")
        print(f"  → Error details: {e}")
        if VERBOSE:
            import traceback
            print(f"  → Traceback: {traceback.format_exc()}")
        return None, error_type


def reverse_hls_quality(m3u8_content):
    """
    Reverse the quality order in m3u8 playlist
    High quality streams will appear first
    """
    lines = m3u8_content.split('\n')
    
    # Find all stream definitions (lines starting with #EXT-X-STREAM-INF)
    stream_blocks = []
    current_block = []
    
    for line in lines:
        if line.startswith('#EXTM3U'):
            # Keep header
            continue
        elif line.startswith('#EXT-X-STREAM-INF'):
            if current_block:
                stream_blocks.append(current_block)
            current_block = [line]
        elif current_block:
            current_block.append(line)
            if line and not line.startswith('#'):
                # End of this stream block
                stream_blocks.append(current_block)
                current_block = []
    
    # Add any remaining block
    if current_block:
        stream_blocks.append(current_block)
    
    # Reverse the order (high quality first)
    stream_blocks.reverse()
    
    # Reconstruct m3u8
    result = ['#EXTM3U']
    for block in stream_blocks:
        result.extend(block)
    
    return '\n'.join(result)


def get_output_path(stream_config):
    """Get the output file path for a stream"""
    slug = stream_config['slug']
    subfolder = stream_config.get('subfolder', '')
    
    # Build output path
    if subfolder:
        output_dir = Path(FOLDER_NAME) / subfolder
    else:
        output_dir = Path(FOLDER_NAME)
    
    return output_dir / f"{slug}.m3u8"


def delete_old_file(stream_config):
    """Delete the old m3u8 file if it exists"""
    output_file = get_output_path(stream_config)
    
    try:
        if output_file.exists():
            output_file.unlink()
            print(f"  ⚠ Deleted old file: {output_file}")
            return True
    except Exception as e:
        print(f"  ⚠ Could not delete old file {output_file}: {e}")
        return False
    
    return False


def save_stream(stream_config, m3u8_content):
    """Save m3u8 content to file"""
    slug = stream_config['slug']
    
    # Get output file path
    output_file = get_output_path(stream_config)
    output_dir = output_file.parent
    
    # Create directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Reverse quality order
    reversed_content = reverse_hls_quality(m3u8_content)
    
    # Write to file
    try:
        with open(output_file, 'w') as f:
            f.write(reversed_content)
        print(f"  ✓ Saved: {output_file}")
        return True
    except Exception as e:
        print(f"  ✗ Error saving {output_file}: {e}")
        return False


def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description='Update YouTube stream m3u8 playlists',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python update_streams.py config.json
  python update_streams.py streams/live.json
  python update_streams.py config1.json config2.json
  python update_streams.py config.json --retries 5 --timeout 60
        """
    )
    
    parser.add_argument(
        'config_files',
        nargs='+',
        help='Configuration file(s) to process'
    )
    
    parser.add_argument(
        '--endpoint',
        default=ENDPOINT,
        help=f'API endpoint URL (default: {ENDPOINT})'
    )
    
    parser.add_argument(
        '--folder',
        default=FOLDER_NAME,
        help=f'Output folder name (default: {FOLDER_NAME})'
    )
    
    parser.add_argument(
        '--timeout',
        type=int,
        default=TIMEOUT,
        help=f'Request timeout in seconds (default: {TIMEOUT})'
    )
    
    parser.add_argument(
        '--retries',
        type=int,
        default=MAX_RETRIES,
        help=f'Maximum retry attempts (default: {MAX_RETRIES})'
    )
    
    parser.add_argument(
        '--retry-delay',
        type=int,
        default=RETRY_DELAY,
        help=f'Initial retry delay in seconds (default: {RETRY_DELAY})'
    )
    
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Enable verbose debug output'
    )
    
    parser.add_argument(
        '--fail-on-error',
        action='store_true',
        help='Exit with error code if any streams fail (default: exit successfully)'
    )
    
    return parser.parse_args()


def main():
    """Main execution function"""
    global VERBOSE
    args = parse_arguments()
    
    # Update globals with command line arguments
    global ENDPOINT, FOLDER_NAME, TIMEOUT, MAX_RETRIES, RETRY_DELAY
    ENDPOINT = args.endpoint
    FOLDER_NAME = args.folder
    TIMEOUT = args.timeout
    MAX_RETRIES = args.retries
    RETRY_DELAY = args.retry_delay
    VERBOSE = args.verbose
    
    print("=" * 50)
    print("YouTube Stream Updater (Improved)")
    print("=" * 50)
    print(f"Endpoint: {ENDPOINT}")
    print(f"Output folder: {FOLDER_NAME}")
    print(f"Config files: {', '.join(args.config_files)}")
    print(f"Timeout: {TIMEOUT}s")
    print(f"Max retries: {MAX_RETRIES}")
    print(f"Retry delay: {RETRY_DELAY}s")
    print(f"Verbose: {VERBOSE}")
    print(f"Session type: {session_type}")
    print("=" * 50)
    
    total_success = 0
    total_fail = 0
    error_summary = {}  # Track error types
    
    # Process each config file
    for config_file in args.config_files:
        print(f"\n📄 Processing config: {config_file}")
        print("-" * 50)
        
        # Load configuration
        streams = load_config(config_file)
        
        # Process each stream
        for i, stream in enumerate(streams, 1):
            slug = stream.get('slug', 'unknown')
            print(f"\n[{i}/{len(streams)}] Processing: {slug}")
            
            # Fetch stream URL with retry
            m3u8_content, error_type = fetch_stream_url_with_retry(stream)
            
            if m3u8_content:
                # Save to file
                if save_stream(stream, m3u8_content):
                    total_success += 1
                else:
                    total_fail += 1
                    # Delete old file on save error
                    delete_old_file(stream)
                    error_summary['SaveError'] = error_summary.get('SaveError', 0) + 1
            else:
                total_fail += 1
                # Delete old file on fetch error
                delete_old_file(stream)
                # Track error type
                if error_type:
                    error_summary[error_type] = error_summary.get(error_type, 0) + 1
    
    # Summary
    print("\n" + "=" * 50)
    print(f"Complete: {total_success} successful, {total_fail} failed")
    
    # Error breakdown
    if error_summary:
        print("\nError Breakdown:")
        for error_type, count in sorted(error_summary.items(), key=lambda x: x[1], reverse=True):
            print(f"  • {error_type}: {count}")
    
    print("=" * 50)
    
    # Handle exit code based on --fail-on-error flag
    if total_fail > 0:
        if args.fail_on_error:
            print(f"\n✗ Exiting with error code due to {total_fail} failed stream(s)")
            sys.exit(1)
        else:
            print(f"\n⚠ Note: {total_fail} stream(s) failed but {total_success} were successful")
            print("📝 Successful streams will be committed to repository")
            print("💡 Use --fail-on-error to exit with error code on failures")


if __name__ == "__main__":
    main()

// Node.js Lambda @ Edge
// Adds security headers to static site hosted in CloudFront (sudo.pagerduty.com)
// https://aws.amazon.com/blogs/networking-and-content-delivery/adding-http-security-headers-using-lambdaedge-and-amazon-cloudfront/

'use strict';
exports.handler = (event, context, callback) => {
    // Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    // Set new headers
    headers['strict-transport-security'] = [{key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains'}];
    headers['content-security-policy'] = [{key: 'Content-Security-Policy', value: "default-src 'none'; script-src 'self' ssl.google-analytics.com www.google-analytics.com 'sha256-nOjM72OI0W7QRbH5RI3KgGucBgLF9Njy4jlVYaUnkmA=' 'sha256-fX9qfHwuLRAhhgRM/UaGciy4GcC8DMLAacNFMsVHnk8=' 'sha256-aWflYUKL1Gj8gU1eM4Mhgu1d5OH6qY8vRRpLE1QFUF8='; object-src 'self'; style-src 'self' 'sha256-LpfmXS+4ZtL2uPRZgkoR29Ghbxcfime/CsD/4w5VujE=' 'sha256-nK6A3vwzvwoN92MnHZrWtylYkYmW1jCQgTqWKQJNBMI=' 'sha256-QVPYhFew7P3p46DxC68MMy/iAdzPaXWHAFcS3O2A0tI='; img-src 'self' data: ssl.google-analytics.com www.google-analytics.com; media-src 'none'; frame-src 'none'; font-src 'self'; connect-src 'self' ssl.google-analytics.com www.google-analytics.com; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"}];
    headers['x-content-type-options'] = [{key: 'X-Content-Type-Options', value: 'nosniff'}];
    headers['x-frame-options'] = [{key: 'X-Frame-Options', value: 'DENY'}];
    headers['x-xss-protection'] = [{key: 'X-XSS-Protection', value: '1; mode=block'}];
    headers['referrer-policy'] = [{key: 'Referrer-Policy', value: 'same-origin'}];
    headers['feature-policy'] = [{key: 'Feature-Policy', value: "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'"}]

    // Return modified response
    callback(null, response);
};

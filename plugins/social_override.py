"""MkDocs hook: let per-page `image:` frontmatter override the social card.

Registered under `hooks:` in mkdocs.yml. MkDocs hooks must be module-level
functions (not a BasePlugin subclass) or they are silently never called.
"""
import re


def on_post_page(html, page, config, **kwargs):
    """Replace the social plugin's og:image / twitter:image with page.meta['image']."""
    image = (page.meta or {}).get('image')
    if not image:
        return html

    site_url = config['site_url'].rstrip('/')
    full_image_url = site_url + '/' + image.lstrip('/')

    def swap(pattern, attr, name):
        nonlocal html
        for tag in re.findall(pattern, html):
            if '/assets/images/social/' in tag:
                html = html.replace(tag, f'<meta {attr}="{name}" content="{full_image_url}">')

    swap(r'<meta\s+property="og:image"[^>]*?>', 'property', 'og:image')
    swap(r'<meta\s+name="twitter:image"[^>]*?>', 'name', 'twitter:image')
    return html

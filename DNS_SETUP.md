# 🌐 DNS Setup for piranha.si

## Required DNS Records

Add these **A records** with your domain registrar:

```
Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.108.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.109.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.110.153

Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.111.153
```

## Optional: WWW Subdomain

If you want `www.piranha.si` to work too:

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

## How to Add DNS Records

### For Most Registrars:
1. **Log into your domain registrar** (where you bought piranha.si)
2. **Find DNS settings** (usually called "DNS Management", "Name Servers", or "DNS Zone")
3. **Delete any existing A records** for the root domain (@)
4. **Add the 4 A records** listed above
5. **Save changes**

### Common Registrars:
- **Namecheap**: Advanced DNS → Host Records
- **GoDaddy**: DNS → Manage Zones → DNS Records
- **Cloudflare**: DNS → Records
- **Google Domains**: DNS → Custom Records

## Verification

After adding DNS records, test with:

```bash
nslookup piranha.si
```

Should return the GitHub Pages IPs:
- 185.199.108.153
- 185.199.109.153  
- 185.199.110.153
- 185.199.111.153

## Timeline

- **DNS changes**: 15 minutes to 48 hours
- **GitHub Pages**: Additional 24 hours for SSL certificate
- **Full propagation**: Up to 48 hours globally

## Temporary Access

While DNS propagates, you can access your site at:
`https://yourusername.github.io/your-repo-name`

## Troubleshooting

**If nslookup shows different IPs:**
- DNS hasn't propagated yet (wait longer)
- Records weren't saved properly (check registrar)
- Using wrong record type (must be A records, not CNAME for root)

**If you see "This site can't be reached":**
- DNS not configured yet
- Still propagating (wait 24-48 hours)
- Check GitHub Pages settings (should be "GitHub Actions")
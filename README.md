# DoAide Legal

Free legal document templates and generators for India at [legal.doaide.com](https://legal.doaide.com).

## Tools

- Rental Agreement Generator
- NDA Generator (Mutual / One-Way)
- Employment Offer Letter
- Freelancer Contract
- Invoice Generator (with GST)
- Power of Attorney
- Partnership Deed
- Resignation Letter
- Experience Certificate
- Salary Slip Generator
- Legal Notice
- Affidavit

All tools are free, require no login, and generate professional PDF and DOCX documents.

## Architecture

- **Backend**: Python FastAPI (port 3050) — PDF generation with reportlab, DOCX with python-docx
- **Frontend**: React + Vite + Tailwind CSS (port 3051)
- No database — documents generated in-memory

## Setup

### API

```bash
cd api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 172.18.0.1 --port 3050
```

### Web

```bash
cd web
npm install
npm run dev
```

### Production

```bash
# Build frontend
cd web && npm run build

# Copy service files
sudo cp doaide-legal-api.service /etc/systemd/system/
sudo cp doaide-legal-web.service /etc/systemd/system/
sudo systemctl enable --now doaide-legal-api doaide-legal-web
```

## Environment Variables

See `.env.example` for configuration options.

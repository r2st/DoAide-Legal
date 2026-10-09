import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "ok"
    assert data["service"] == "doaide-legal-api"


def test_rental_agreement_pdf():
    payload = {
        "landlord_name": "Test Landlord",
        "landlord_address": "123 Main St, Mumbai",
        "tenant_name": "Test Tenant",
        "tenant_address": "456 Oak Ave, Mumbai",
        "property_address": "789 Pine Rd, Mumbai",
        "monthly_rent": 25000,
        "security_deposit": 50000,
        "lease_start_date": "01/01/2026",
    }
    resp = client.post("/api/rental-agreement?format=pdf", json=payload)
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"
    assert len(resp.content) > 100


def test_rental_agreement_docx():
    payload = {
        "landlord_name": "Test Landlord",
        "landlord_address": "123 Main St, Mumbai",
        "tenant_name": "Test Tenant",
        "tenant_address": "456 Oak Ave, Mumbai",
        "property_address": "789 Pine Rd, Mumbai",
        "monthly_rent": 25000,
        "security_deposit": 50000,
        "lease_start_date": "01/01/2026",
    }
    resp = client.post("/api/rental-agreement?format=docx", json=payload)
    assert resp.status_code == 200
    assert "wordprocessingml" in resp.headers["content-type"]


def test_nda_pdf():
    payload = {
        "disclosing_party_name": "Company A",
        "disclosing_party_address": "Mumbai",
        "receiving_party_name": "Company B",
        "receiving_party_address": "Delhi",
        "effective_date": "01/06/2026",
        "purpose": "Business partnership exploration",
        "governing_state": "Maharashtra",
    }
    resp = client.post("/api/nda?format=pdf", json=payload)
    assert resp.status_code == 200
    assert resp.headers["content-type"] == "application/pdf"


def test_offer_letter():
    payload = {
        "company_name": "Test Corp",
        "company_address": "Bangalore",
        "candidate_name": "John Doe",
        "candidate_address": "Pune",
        "designation": "Software Engineer",
        "department": "Engineering",
        "ctc_annual": 1200000,
        "basic_salary": 50000,
        "hra": 20000,
        "special_allowance": 15000,
        "pf_contribution": 6000,
        "date_of_joining": "01/07/2026",
        "reporting_manager": "Jane Smith",
        "work_location": "Bangalore",
        "offer_date": "01/06/2026",
        "offer_expiry_date": "15/06/2026",
    }
    resp = client.post("/api/offer-letter?format=pdf", json=payload)
    assert resp.status_code == 200


def test_freelancer_contract():
    payload = {
        "client_name": "Client Corp",
        "client_address": "Mumbai",
        "freelancer_name": "Freelancer Dev",
        "freelancer_address": "Delhi",
        "project_description": "Build a website",
        "deliverables": ["Homepage", "About page"],
        "start_date": "01/07/2026",
        "end_date": "01/09/2026",
        "total_fee": 100000,
        "governing_state": "Maharashtra",
    }
    resp = client.post("/api/freelancer-contract?format=pdf", json=payload)
    assert resp.status_code == 200


def test_invoice():
    payload = {
        "invoice_number": "INV-001",
        "invoice_date": "01/06/2026",
        "due_date": "15/06/2026",
        "seller_name": "Seller Corp",
        "seller_address": "Mumbai",
        "buyer_name": "Buyer Corp",
        "buyer_address": "Delhi",
        "items": [{"description": "Web Development", "quantity": 1, "rate": 50000}],
        "gst_rate": 18,
    }
    resp = client.post("/api/invoice?format=pdf", json=payload)
    assert resp.status_code == 200


def test_power_of_attorney():
    payload = {
        "principal_name": "Principal Person",
        "principal_address": "Mumbai",
        "attorney_name": "Attorney Person",
        "attorney_address": "Delhi",
        "powers_granted": ["Sell property", "Sign documents"],
        "effective_date": "01/06/2026",
        "governing_state": "Maharashtra",
        "witnesses": [
            {"name": "Witness 1", "address": "Mumbai"},
            {"name": "Witness 2", "address": "Mumbai"},
        ],
    }
    resp = client.post("/api/power-of-attorney?format=pdf", json=payload)
    assert resp.status_code == 200


def test_partnership_deed():
    payload = {
        "firm_name": "Test Partners",
        "firm_address": "Mumbai",
        "business_nature": "Software Consulting",
        "partners": [
            {"name": "Partner A", "address": "Mumbai", "capital_contribution": 500000, "profit_share_percentage": 50},
            {"name": "Partner B", "address": "Delhi", "capital_contribution": 500000, "profit_share_percentage": 50},
        ],
        "commencement_date": "01/06/2026",
        "bank_name": "SBI",
        "governing_state": "Maharashtra",
    }
    resp = client.post("/api/partnership-deed?format=pdf", json=payload)
    assert resp.status_code == 200


def test_resignation_letter():
    payload = {
        "employee_name": "John Doe",
        "employee_designation": "Engineer",
        "department": "Engineering",
        "company_name": "Test Corp",
        "manager_name": "Jane Manager",
        "manager_designation": "Director",
        "last_working_date": "01/07/2026",
        "resignation_date": "01/06/2026",
    }
    resp = client.post("/api/resignation-letter?format=pdf", json=payload)
    assert resp.status_code == 200


def test_experience_certificate():
    payload = {
        "company_name": "Test Corp",
        "company_address": "Mumbai",
        "employee_name": "John Doe",
        "employee_designation": "Engineer",
        "department": "Engineering",
        "date_of_joining": "01/01/2023",
        "date_of_leaving": "01/06/2026",
        "issue_date": "05/06/2026",
        "signatory_name": "HR Manager",
        "signatory_designation": "HR Director",
    }
    resp = client.post("/api/experience-certificate?format=pdf", json=payload)
    assert resp.status_code == 200


def test_salary_slip():
    payload = {
        "company_name": "Test Corp",
        "company_address": "Mumbai",
        "employee_name": "John Doe",
        "employee_id": "EMP001",
        "designation": "Engineer",
        "department": "Engineering",
        "month": "June",
        "year": 2026,
        "basic_salary": 40000,
        "hra": 16000,
        "pf_deduction": 4800,
        "total_working_days": 22,
        "days_worked": 22,
    }
    resp = client.post("/api/salary-slip?format=pdf", json=payload)
    assert resp.status_code == 200


def test_legal_notice():
    payload = {
        "sender_name": "Sender Person",
        "sender_address": "Mumbai",
        "recipient_name": "Recipient Person",
        "recipient_address": "Delhi",
        "subject": "Payment Default",
        "facts": ["Fact 1"],
        "legal_grounds": ["Ground 1"],
        "relief_sought": ["Relief 1"],
        "notice_date": "01/06/2026",
        "governing_state": "Maharashtra",
    }
    resp = client.post("/api/legal-notice?format=pdf", json=payload)
    assert resp.status_code == 200


def test_affidavit():
    payload = {
        "deponent_name": "John Doe",
        "deponent_address": "Mumbai",
        "deponent_age": 30,
        "deponent_occupation": "Engineer",
        "deponent_father_name": "Father Doe",
        "purpose": "Address Proof",
        "statements": ["I reside at the above address"],
        "place": "Mumbai",
        "date": "01/06/2026",
    }
    resp = client.post("/api/affidavit?format=pdf", json=payload)
    assert resp.status_code == 200


def test_invalid_tool_returns_404():
    resp = client.post("/api/nonexistent-tool", json={})
    assert resp.status_code in (404, 405, 422)


def test_missing_required_field():
    resp = client.post("/api/rental-agreement?format=pdf", json={"landlord_name": "Test"})
    assert resp.status_code == 422


def test_format_inr():
    from generators import format_inr
    assert format_inr(1000) == "₹1,000.00"
    assert format_inr(100000) == "₹1,00,000.00"
    assert format_inr(1234567.89) == "₹12,34,567.89"
    assert format_inr(500) == "₹500.00"
    assert format_inr(0) == "₹0.00"


def test_generic_legal_doc_pdf():
    from generators.pdf_generator import generate_generic_legal_doc
    sections = [
        {"heading": "Introduction", "content": "This is a test document.\n\nWith multiple paragraphs."},
        {"heading": "Terms", "content": "Some terms here."},
    ]
    result = generate_generic_legal_doc("Test Document", "Test Subtitle", sections)
    assert isinstance(result, bytes)
    assert len(result) > 100


def test_generic_legal_doc_docx():
    from generators.docx_generator import generate_generic_legal_doc
    sections = [
        {"heading": "Introduction", "content": "This is a test document.\n\nWith multiple paragraphs."},
        {"heading": "Terms", "content": "Some terms here."},
    ]
    result = generate_generic_legal_doc("Test Document", "Test Subtitle", sections)
    assert isinstance(result, bytes)
    assert len(result) > 100

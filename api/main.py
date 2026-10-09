from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from models import (
    RentalAgreementRequest, NDARequest, OfferLetterRequest,
    FreelancerContractRequest, InvoiceRequest, PowerOfAttorneyRequest,
    PartnershipDeedRequest, ResignationLetterRequest,
    ExperienceCertificateRequest, SalarySlipRequest,
    LegalNoticeRequest, AffidavitRequest,
    PrivacyPolicyRequest, TermsOfServiceRequest, ContractClauseRequest,
)
from generators import pdf_generator, docx_generator
from llm import generate_with_gemini, extract_json_from_response

app = FastAPI(title="DoAide Legal API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _respond(pdf_bytes: bytes, docx_bytes: bytes, fmt: str, filename: str):
    if fmt == "docx":
        return Response(
            content=docx_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f'attachment; filename="{filename}.docx"'},
        )
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}.pdf"'},
    )


@app.get("/health")
def health():
    return {"status": "ok", "service": "doaide-legal-api"}


@app.post("/api/rental-agreement")
def rental_agreement(data: RentalAgreementRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_rental_agreement(data)
    docx = docx_generator.generate_rental_agreement(data)
    return _respond(pdf, docx, format, "Rental_Agreement")


@app.post("/api/nda")
def nda(data: NDARequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_nda(data)
    docx = docx_generator.generate_nda(data)
    return _respond(pdf, docx, format, "NDA")


@app.post("/api/offer-letter")
def offer_letter(data: OfferLetterRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_offer_letter(data)
    docx = docx_generator.generate_offer_letter(data)
    return _respond(pdf, docx, format, "Offer_Letter")


@app.post("/api/freelancer-contract")
def freelancer_contract(data: FreelancerContractRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_freelancer_contract(data)
    docx = docx_generator.generate_freelancer_contract(data)
    return _respond(pdf, docx, format, "Freelancer_Contract")


@app.post("/api/invoice")
def invoice(data: InvoiceRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_invoice(data)
    docx = docx_generator.generate_invoice(data)
    return _respond(pdf, docx, format, "Invoice")


@app.post("/api/power-of-attorney")
def power_of_attorney(data: PowerOfAttorneyRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_power_of_attorney(data)
    docx = docx_generator.generate_power_of_attorney(data)
    return _respond(pdf, docx, format, "Power_of_Attorney")


@app.post("/api/partnership-deed")
def partnership_deed(data: PartnershipDeedRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_partnership_deed(data)
    docx = docx_generator.generate_partnership_deed(data)
    return _respond(pdf, docx, format, "Partnership_Deed")


@app.post("/api/resignation-letter")
def resignation_letter(data: ResignationLetterRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_resignation_letter(data)
    docx = docx_generator.generate_resignation_letter(data)
    return _respond(pdf, docx, format, "Resignation_Letter")


@app.post("/api/experience-certificate")
def experience_certificate(data: ExperienceCertificateRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_experience_certificate(data)
    docx = docx_generator.generate_experience_certificate(data)
    return _respond(pdf, docx, format, "Experience_Certificate")


@app.post("/api/salary-slip")
def salary_slip(data: SalarySlipRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_salary_slip(data)
    docx = docx_generator.generate_salary_slip(data)
    return _respond(pdf, docx, format, "Salary_Slip")


@app.post("/api/legal-notice")
def legal_notice(data: LegalNoticeRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_legal_notice(data)
    docx = docx_generator.generate_legal_notice(data)
    return _respond(pdf, docx, format, "Legal_Notice")


@app.post("/api/affidavit")
def affidavit(data: AffidavitRequest, format: str = Query("pdf")):
    pdf = pdf_generator.generate_affidavit(data)
    docx = docx_generator.generate_affidavit(data)
    return _respond(pdf, docx, format, "Affidavit")


@app.post("/api/privacy-policy")
async def privacy_policy(data: PrivacyPolicyRequest, format: str = Query("pdf")):
    data_list = ", ".join(data.data_collected) if data.data_collected else "name, email"
    third_party = ", ".join(data.third_party_services) if data.third_party_services else "none"
    prompt = f"""Generate a comprehensive Privacy Policy for an Indian company. Return ONLY valid JSON with this structure:
{{"title": "Privacy Policy", "sections": [{{"heading": "section title", "content": "section content"}}]}}

Details:
- Company: {data.company_name}
- Website: {data.website_url}
- Business Type: {data.business_type}
- Data Collected: {data_list}
- Uses Cookies: {data.uses_cookies}
- Uses Analytics: {data.uses_analytics}
- Third-Party Services: {third_party}
- Country: {data.country}
- Contact Email: {data.contact_email or 'N/A'}
- Effective Date: {data.effective_date or 'Date of publication'}

Include sections for: Information Collection, Use of Information, Cookies, Data Sharing, Data Security, User Rights, Children's Privacy, Changes to Policy, Contact Information. Make it compliant with Indian IT Act 2000 and DPDP Act 2023. Use professional legal language. Each section content should be 2-4 paragraphs."""

    text = await generate_with_gemini(prompt)
    sections = extract_json_from_response(text)
    pdf = pdf_generator.generate_generic_legal_doc(
        title=sections.get("title", "Privacy Policy"),
        subtitle=f"For {data.company_name}",
        sections=sections.get("sections", []),
    )
    docx = docx_generator.generate_generic_legal_doc(
        title=sections.get("title", "Privacy Policy"),
        subtitle=f"For {data.company_name}",
        sections=sections.get("sections", []),
    )
    return _respond(pdf, docx, format, "Privacy_Policy")


@app.post("/api/terms-of-service")
async def terms_of_service(data: TermsOfServiceRequest, format: str = Query("pdf")):
    prompt = f"""Generate comprehensive Terms of Service for an Indian company. Return ONLY valid JSON with this structure:
{{"title": "Terms of Service", "sections": [{{"heading": "section title", "content": "section content"}}]}}

Details:
- Company: {data.company_name}
- Website: {data.website_url}
- Business Type: {data.business_type}
- Services: {data.services_description or 'General online services'}
- Governing State: {data.governing_state or 'Not specified'}
- Country: {data.country}
- Minimum Age: {data.minimum_age}
- Allows User Content: {data.allows_user_content}
- Has Paid Services: {data.has_paid_services}
- Refund Policy: {data.refund_policy or 'Standard'}
- Contact Email: {data.contact_email or 'N/A'}
- Effective Date: {data.effective_date or 'Date of publication'}

Include sections for: Acceptance of Terms, Use License, User Accounts, Prohibited Uses, Intellectual Property, Limitation of Liability, Indemnification, Termination, Governing Law, Changes to Terms, Contact. {"Include sections for User Content and Content Moderation." if data.allows_user_content else ""} {"Include sections for Payments, Refunds, and Subscription Terms." if data.has_paid_services else ""} Compliant with Indian IT Act 2000 and Consumer Protection Act 2019. Professional legal language. Each section 2-4 paragraphs."""

    text = await generate_with_gemini(prompt)
    sections = extract_json_from_response(text)
    pdf = pdf_generator.generate_generic_legal_doc(
        title=sections.get("title", "Terms of Service"),
        subtitle=f"For {data.company_name}",
        sections=sections.get("sections", []),
    )
    docx = docx_generator.generate_generic_legal_doc(
        title=sections.get("title", "Terms of Service"),
        subtitle=f"For {data.company_name}",
        sections=sections.get("sections", []),
    )
    return _respond(pdf, docx, format, "Terms_of_Service")


@app.post("/api/contract-clause-library")
async def contract_clause_library(data: ContractClauseRequest):
    prompt = f"""Generate professional contract clauses for an Indian legal context. Return ONLY valid JSON with this structure:
{{"clause_type": "{data.clause_type}", "clauses": [{{"title": "clause title", "text": "full clause text", "notes": "when to use this clause"}}]}}

Details:
- Clause Type: {data.clause_type}
- Context: {data.context or 'General purpose'}
- Party A: {data.party_a or 'First Party'}
- Party B: {data.party_b or 'Second Party'}
- Governing State: {data.governing_state or 'Not specified'}
- Industry: {data.industry}

Generate 3-5 variations of the clause from basic to comprehensive. Each clause should be ready to copy-paste into a contract. Include usage notes for each variation. Use professional Indian legal language compliant with the Indian Contract Act 1872."""

    text = await generate_with_gemini(prompt)
    result = extract_json_from_response(text)
    return JSONResponse(content=result)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="172.18.0.1", port=3050)

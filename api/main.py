from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from models import (
    RentalAgreementRequest, NDARequest, OfferLetterRequest,
    FreelancerContractRequest, InvoiceRequest, PowerOfAttorneyRequest,
    PartnershipDeedRequest, ResignationLetterRequest,
    ExperienceCertificateRequest, SalarySlipRequest,
    LegalNoticeRequest, AffidavitRequest,
)
from generators import pdf_generator, docx_generator

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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="172.18.0.1", port=3050)

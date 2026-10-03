from pydantic import BaseModel, Field
from typing import Optional


class RentalAgreementRequest(BaseModel):
    landlord_name: str
    landlord_address: str
    landlord_aadhaar: Optional[str] = None
    tenant_name: str
    tenant_address: str
    tenant_aadhaar: Optional[str] = None
    property_address: str
    property_type: str = "flat"
    monthly_rent: float
    security_deposit: float
    lease_start_date: str
    lease_duration_months: int = 11
    rent_due_day: int = 5
    notice_period_months: int = 1
    purpose: str = "residential"
    furnishing: str = "unfurnished"
    maintenance_charges: Optional[float] = None
    additional_clauses: list[str] = Field(default_factory=list)


class NDARequest(BaseModel):
    nda_type: str = "mutual"
    disclosing_party_name: str
    disclosing_party_address: str
    receiving_party_name: str
    receiving_party_address: str
    effective_date: str
    confidentiality_period_years: int = 2
    purpose: str
    governing_state: str
    additional_exclusions: list[str] = Field(default_factory=list)


class OfferLetterRequest(BaseModel):
    company_name: str
    company_address: str
    company_logo_text: Optional[str] = None
    candidate_name: str
    candidate_address: str
    designation: str
    department: str
    date_of_joining: str
    ctc_annual: float
    basic_salary: float
    hra: float
    special_allowance: float
    pf_contribution: float
    reporting_manager: str
    work_location: str
    probation_months: int = 6
    notice_period_months: int = 1
    offer_date: str
    offer_expiry_date: str
    additional_benefits: list[str] = Field(default_factory=list)


class FreelancerContractRequest(BaseModel):
    client_name: str
    client_address: str
    freelancer_name: str
    freelancer_address: str
    project_description: str
    deliverables: list[str]
    start_date: str
    end_date: str
    total_fee: float
    payment_schedule: str = "milestone"
    advance_percentage: Optional[float] = None
    revision_rounds: int = 2
    ip_ownership: str = "client"
    confidentiality: bool = True
    termination_notice_days: int = 15
    governing_state: str


class InvoiceItem(BaseModel):
    description: str
    quantity: float
    rate: float
    hsn_code: Optional[str] = None


class InvoiceRequest(BaseModel):
    invoice_number: str
    invoice_date: str
    due_date: str
    seller_name: str
    seller_address: str
    seller_gstin: Optional[str] = None
    seller_pan: Optional[str] = None
    buyer_name: str
    buyer_address: str
    buyer_gstin: Optional[str] = None
    items: list[InvoiceItem]
    discount_percentage: Optional[float] = None
    gst_rate: float = 18.0
    is_igst: bool = False
    notes: Optional[str] = None
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    ifsc_code: Optional[str] = None


class Witness(BaseModel):
    name: str
    address: str


class PowerOfAttorneyRequest(BaseModel):
    poa_type: str = "general"
    principal_name: str
    principal_address: str
    principal_aadhaar: Optional[str] = None
    attorney_name: str
    attorney_address: str
    attorney_aadhaar: Optional[str] = None
    powers_granted: list[str]
    effective_date: str
    expiry_date: Optional[str] = None
    governing_state: str
    witnesses: list[Witness]


class Partner(BaseModel):
    name: str
    address: str
    capital_contribution: float
    profit_share_percentage: float


class PartnershipDeedRequest(BaseModel):
    firm_name: str
    firm_address: str
    business_nature: str
    partners: list[Partner]
    commencement_date: str
    duration: str = "at-will"
    bank_name: str
    bank_account: Optional[str] = None
    financial_year_start: str = "1st April"
    dispute_resolution: str = "arbitration"
    governing_state: str
    additional_clauses: list[str] = Field(default_factory=list)


class ResignationLetterRequest(BaseModel):
    employee_name: str
    employee_designation: str
    employee_id: Optional[str] = None
    department: str
    company_name: str
    manager_name: str
    manager_designation: str
    last_working_date: str
    notice_period_days: int = 30
    reason: Optional[str] = None
    resignation_date: str


class ExperienceCertificateRequest(BaseModel):
    company_name: str
    company_address: str
    company_logo_text: Optional[str] = None
    employee_name: str
    employee_designation: str
    department: str
    date_of_joining: str
    date_of_leaving: str
    responsibilities: list[str] = Field(default_factory=list)
    performance_rating: Optional[str] = None
    issue_date: str
    signatory_name: str
    signatory_designation: str


class SalarySlipRequest(BaseModel):
    company_name: str
    company_address: str
    employee_name: str
    employee_id: str
    designation: str
    department: str
    month: str
    year: int
    basic_salary: float
    hra: float
    dearness_allowance: float = 0
    conveyance_allowance: float = 0
    medical_allowance: float = 0
    special_allowance: float = 0
    other_earnings: float = 0
    pf_deduction: float
    esi_deduction: float = 0
    professional_tax: float = 0
    income_tax: float = 0
    other_deductions: float = 0
    total_working_days: int
    days_worked: int
    bank_name: Optional[str] = None
    bank_account: Optional[str] = None
    pan_number: Optional[str] = None
    uan_number: Optional[str] = None


class LegalNoticeRequest(BaseModel):
    sender_name: str
    sender_address: str
    sender_through_advocate: Optional[str] = None
    recipient_name: str
    recipient_address: str
    subject: str
    facts: list[str]
    legal_grounds: list[str]
    relief_sought: list[str]
    compliance_days: int = 15
    notice_date: str
    governing_state: str


class AffidavitRequest(BaseModel):
    deponent_name: str
    deponent_address: str
    deponent_age: int
    deponent_occupation: str
    deponent_father_name: str
    purpose: str
    statements: list[str]
    place: str
    date: str
    notary_name: Optional[str] = None

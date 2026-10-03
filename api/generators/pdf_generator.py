import io
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.lib.colors import HexColor, black, grey
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable
)
from reportlab.lib import colors
from generators import format_inr


BRAND_FOOTER = "Generated with DoAide Legal — legal.doaide.com"


def _get_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="DocTitle", parent=styles["Title"],
        fontSize=16, leading=20, alignment=TA_CENTER,
        spaceAfter=6, fontName="Helvetica-Bold"
    ))
    styles.add(ParagraphStyle(
        name="DocSubtitle", parent=styles["Normal"],
        fontSize=12, leading=14, alignment=TA_CENTER,
        fontName="Helvetica-Oblique", spaceAfter=12, textColor=grey
    ))
    styles.add(ParagraphStyle(
        name="Body", parent=styles["Normal"],
        fontSize=11, leading=15, alignment=TA_JUSTIFY,
        fontName="Helvetica", spaceAfter=8
    ))
    styles.add(ParagraphStyle(
        name="BodyLeft", parent=styles["Normal"],
        fontSize=11, leading=15, alignment=TA_LEFT,
        fontName="Helvetica", spaceAfter=8
    ))
    styles.add(ParagraphStyle(
        name="SectionHead", parent=styles["Normal"],
        fontSize=12, leading=16, fontName="Helvetica-Bold",
        spaceBefore=14, spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        name="SmallGrey", parent=styles["Normal"],
        fontSize=7, leading=9, alignment=TA_CENTER,
        textColor=HexColor("#999999"), fontName="Helvetica"
    ))
    styles.add(ParagraphStyle(
        name="RightAligned", parent=styles["Normal"],
        fontSize=11, leading=15, alignment=TA_RIGHT,
        fontName="Helvetica", spaceAfter=8
    ))
    styles.add(ParagraphStyle(
        name="BoldBody", parent=styles["Normal"],
        fontSize=11, leading=15, alignment=TA_LEFT,
        fontName="Helvetica-Bold", spaceAfter=4
    ))
    styles.add(ParagraphStyle(
        name="TableCell", parent=styles["Normal"],
        fontSize=9, leading=11, fontName="Helvetica"
    ))
    styles.add(ParagraphStyle(
        name="TableCellBold", parent=styles["Normal"],
        fontSize=9, leading=11, fontName="Helvetica-Bold"
    ))
    styles.add(ParagraphStyle(
        name="TableCellRight", parent=styles["Normal"],
        fontSize=9, leading=11, fontName="Helvetica", alignment=TA_RIGHT
    ))
    return styles


def _build_pdf(elements, title_for_filename="document"):
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A4,
        leftMargin=1*inch, rightMargin=1*inch,
        topMargin=1*inch, bottomMargin=1*inch,
        title=title_for_filename
    )
    styles = _get_styles()
    elements.append(Spacer(1, 20))
    elements.append(Paragraph(BRAND_FOOTER, styles["SmallGrey"]))
    doc.build(elements)
    buf.seek(0)
    return buf.getvalue()


def _hr():
    return HRFlowable(width="100%", thickness=0.5, color=grey, spaceAfter=10, spaceBefore=10)


def generate_rental_agreement(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("RENTAL / LEASE AGREEMENT", s["DocTitle"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(
        f'This Rental Agreement is made and executed on <b>{data.lease_start_date}</b> '
        f'at the place mentioned herein between the parties described below:', s["Body"]
    ))
    e.append(Spacer(1, 8))

    e.append(Paragraph("<b>LANDLORD / LESSOR:</b>", s["BoldBody"]))
    landlord_text = f"Name: {data.landlord_name}<br/>Address: {data.landlord_address}"
    if data.landlord_aadhaar:
        landlord_text += f"<br/>Aadhaar: {data.landlord_aadhaar}"
    e.append(Paragraph(landlord_text, s["BodyLeft"]))
    e.append(Paragraph("(Hereinafter referred to as the <b>\"Landlord\"</b>, which expression shall mean and include their heirs, successors, legal representatives, and assigns)", s["Body"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph("<b>TENANT / LESSEE:</b>", s["BoldBody"]))
    tenant_text = f"Name: {data.tenant_name}<br/>Address: {data.tenant_address}"
    if data.tenant_aadhaar:
        tenant_text += f"<br/>Aadhaar: {data.tenant_aadhaar}"
    e.append(Paragraph(tenant_text, s["BodyLeft"]))
    e.append(Paragraph("(Hereinafter referred to as the <b>\"Tenant\"</b>, which expression shall mean and include their heirs, successors, legal representatives, and assigns)", s["Body"]))

    e.append(_hr())
    e.append(Paragraph("PROPERTY DETAILS", s["SectionHead"]))
    e.append(Paragraph(f"Address: {data.property_address}", s["BodyLeft"]))
    e.append(Paragraph(f"Type: {data.property_type.title()}", s["BodyLeft"]))
    e.append(Paragraph(f"Furnishing: {data.furnishing.replace('-', ' ').title()}", s["BodyLeft"]))
    e.append(Paragraph(f"Purpose: {data.purpose.title()}", s["BodyLeft"]))

    e.append(_hr())
    e.append(Paragraph("TERMS AND CONDITIONS", s["SectionHead"]))

    clauses = [
        f"1. <b>Rent:</b> The Tenant shall pay a monthly rent of {format_inr(data.monthly_rent)} to the Landlord on or before the {_ordinal(data.rent_due_day)} of each calendar month.",
        f"2. <b>Security Deposit:</b> The Tenant has paid a security deposit of {format_inr(data.security_deposit)} to the Landlord, which shall be refunded at the time of vacating the premises after deducting any dues or damages.",
        f"3. <b>Duration:</b> This agreement shall be valid for a period of {data.lease_duration_months} months commencing from {data.lease_start_date}.",
        f"4. <b>Notice Period:</b> Either party may terminate this agreement by giving {data.notice_period_months} month(s) written notice to the other party.",
        "5. <b>Usage:</b> The Tenant shall use the premises solely for the purpose mentioned above and shall not use it for any illegal or immoral activities.",
        "6. <b>Sub-letting:</b> The Tenant shall not sub-let, assign, or transfer the tenancy or any part thereof to any third party without prior written consent of the Landlord.",
        "7. <b>Maintenance:</b> The Tenant shall maintain the premises in good condition and shall be responsible for minor repairs. Major structural repairs shall be the responsibility of the Landlord.",
        "8. <b>Alterations:</b> The Tenant shall not make any structural alterations or additions to the premises without the prior written consent of the Landlord.",
        "9. <b>Inspection:</b> The Landlord or their authorized representative shall have the right to inspect the premises at reasonable hours after giving prior notice to the Tenant.",
        "10. <b>Utilities:</b> The Tenant shall bear all charges for electricity, water, gas, and other utilities consumed during the tenancy period.",
        "11. <b>Vacating:</b> Upon expiry or termination, the Tenant shall vacate the premises and hand over peaceful possession to the Landlord in the same condition as received, subject to normal wear and tear.",
        "12. <b>Disputes:</b> Any disputes arising out of this agreement shall be subject to the jurisdiction of the courts at the location of the property.",
    ]
    if data.maintenance_charges:
        clauses.append(f"13. <b>Maintenance Charges:</b> In addition to the rent, the Tenant shall pay maintenance charges of {format_inr(data.maintenance_charges)} per month.")
    for c in clauses:
        e.append(Paragraph(c, s["Body"]))
    if data.additional_clauses:
        start = len(clauses) + 1
        for i, clause in enumerate(data.additional_clauses):
            e.append(Paragraph(f"{start + i}. {clause}", s["Body"]))

    e.append(Spacer(1, 20))
    e.append(Paragraph("IN WITNESS WHEREOF, the parties have set their hands on the day and year first above written.", s["Body"]))
    e.append(Spacer(1, 30))

    sig_data = [
        ["LANDLORD", "", "TENANT"],
        ["", "", ""],
        ["", "", ""],
        [f"Name: {data.landlord_name}", "", f"Name: {data.tenant_name}"],
        ["Signature: _______________", "", "Signature: _______________"],
    ]
    sig_table = Table(sig_data, colWidths=[2.5*inch, 1*inch, 2.5*inch])
    sig_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    e.append(sig_table)
    e.append(Spacer(1, 20))
    e.append(Paragraph("<b>WITNESSES:</b>", s["BoldBody"]))
    e.append(Paragraph("1. Name: _______________ &nbsp;&nbsp; Signature: _______________", s["BodyLeft"]))
    e.append(Paragraph("2. Name: _______________ &nbsp;&nbsp; Signature: _______________", s["BodyLeft"]))

    return _build_pdf(e, "Rental_Agreement")


def generate_nda(data) -> bytes:
    s = _get_styles()
    e = []
    nda_label = "MUTUAL" if data.nda_type == "mutual" else "ONE-WAY"
    e.append(Paragraph(f"{nda_label} NON-DISCLOSURE AGREEMENT", s["DocTitle"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"This Non-Disclosure Agreement (\"Agreement\") is entered into on <b>{data.effective_date}</b> by and between:", s["Body"]))
    e.append(Spacer(1, 4))

    if data.nda_type == "mutual":
        e.append(Paragraph(f"<b>Party A:</b> {data.disclosing_party_name}, having its address at {data.disclosing_party_address}", s["BodyLeft"]))
        e.append(Paragraph(f"<b>Party B:</b> {data.receiving_party_name}, having its address at {data.receiving_party_address}", s["BodyLeft"]))
    else:
        e.append(Paragraph(f"<b>Disclosing Party:</b> {data.disclosing_party_name}, having its address at {data.disclosing_party_address}", s["BodyLeft"]))
        e.append(Paragraph(f"<b>Receiving Party:</b> {data.receiving_party_name}, having its address at {data.receiving_party_address}", s["BodyLeft"]))

    e.append(_hr())
    e.append(Paragraph("RECITALS", s["SectionHead"]))
    e.append(Paragraph(f"WHEREAS, the parties wish to explore a potential business relationship regarding: <b>{data.purpose}</b>, and in connection with this, certain confidential information may be disclosed.", s["Body"]))

    e.append(Paragraph("DEFINITIONS", s["SectionHead"]))
    e.append(Paragraph("\"Confidential Information\" means any and all information, whether written, oral, electronic, or visual, that is disclosed by one party to the other, including but not limited to: trade secrets, business plans, financial data, customer lists, technical specifications, software, designs, processes, and any other proprietary information.", s["Body"]))

    e.append(Paragraph("OBLIGATIONS", s["SectionHead"]))
    obligations = [
        "1. The Receiving Party shall hold all Confidential Information in strict confidence and shall not disclose it to any third party without prior written consent.",
        "2. The Receiving Party shall use the Confidential Information solely for the purpose stated above.",
        "3. The Receiving Party shall protect the Confidential Information with the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care.",
        "4. The Receiving Party shall limit access to the Confidential Information to those employees and advisors who have a need to know and who are bound by confidentiality obligations.",
    ]
    for o in obligations:
        e.append(Paragraph(o, s["Body"]))

    e.append(Paragraph("EXCLUSIONS", s["SectionHead"]))
    exclusions = [
        "Information that is or becomes publicly available through no fault of the Receiving Party.",
        "Information that was already known to the Receiving Party prior to disclosure.",
        "Information that is independently developed by the Receiving Party without reference to the Confidential Information.",
        "Information that is disclosed pursuant to a court order or legal requirement, provided that the Receiving Party gives prompt notice.",
    ]
    for i, ex in enumerate(exclusions):
        e.append(Paragraph(f"{i + 1}. {ex}", s["Body"]))
    if data.additional_exclusions:
        for i, ex in enumerate(data.additional_exclusions):
            e.append(Paragraph(f"{len(exclusions) + i + 1}. {ex}", s["Body"]))

    e.append(Paragraph("TERM", s["SectionHead"]))
    e.append(Paragraph(f"This Agreement shall remain in effect for a period of <b>{data.confidentiality_period_years} year(s)</b> from the date of execution.", s["Body"]))

    e.append(Paragraph("GOVERNING LAW", s["SectionHead"]))
    e.append(Paragraph(f"This Agreement shall be governed by and construed in accordance with the laws of India, and the courts of <b>{data.governing_state}</b> shall have exclusive jurisdiction.", s["Body"]))

    e.append(Spacer(1, 30))
    e.append(Paragraph("IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.", s["Body"]))
    e.append(Spacer(1, 30))

    sig_data = [
        [f"Name: {data.disclosing_party_name}", "", f"Name: {data.receiving_party_name}"],
        ["Signature: _______________", "", "Signature: _______________"],
        ["Date: _______________", "", "Date: _______________"],
    ]
    sig_table = Table(sig_data, colWidths=[2.5*inch, 1*inch, 2.5*inch])
    sig_table.setStyle(TableStyle([("FONTSIZE", (0, 0), (-1, -1), 10)]))
    e.append(sig_table)

    return _build_pdf(e, "NDA")


def generate_offer_letter(data) -> bytes:
    s = _get_styles()
    e = []
    if data.company_logo_text:
        e.append(Paragraph(data.company_logo_text, ParagraphStyle("Logo", parent=s["DocTitle"], fontSize=20, textColor=HexColor("#333333"))))
    e.append(Paragraph(data.company_name, s["DocTitle"]))
    e.append(Paragraph(data.company_address, s["DocSubtitle"]))
    e.append(_hr())

    e.append(Paragraph(f"Date: {data.offer_date}", s["RightAligned"]))
    e.append(Paragraph(f"Ref: OL/{data.offer_date.replace('/', '')}", s["BodyLeft"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(f"To,<br/>{data.candidate_name}<br/>{data.candidate_address}", s["BodyLeft"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(f"<b>Subject: Offer of Employment — {data.designation}</b>", s["BodyLeft"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(f"Dear {data.candidate_name},", s["Body"]))
    e.append(Paragraph(f"We are pleased to offer you the position of <b>{data.designation}</b> in the <b>{data.department}</b> department at {data.company_name}. Your expected date of joining is <b>{data.date_of_joining}</b>.", s["Body"]))

    e.append(Paragraph("COMPENSATION DETAILS", s["SectionHead"]))
    comp_data = [
        [Paragraph("<b>Component</b>", s["TableCellBold"]), Paragraph("<b>Monthly (₹)</b>", s["TableCellBold"]), Paragraph("<b>Annual (₹)</b>", s["TableCellBold"])],
        ["Basic Salary", format_inr(data.basic_salary), format_inr(data.basic_salary * 12)],
        ["HRA", format_inr(data.hra), format_inr(data.hra * 12)],
        ["Special Allowance", format_inr(data.special_allowance), format_inr(data.special_allowance * 12)],
        ["PF (Employer)", format_inr(data.pf_contribution), format_inr(data.pf_contribution * 12)],
        [Paragraph("<b>CTC</b>", s["TableCellBold"]), "", format_inr(data.ctc_annual)],
    ]
    comp_table = Table(comp_data, colWidths=[2.5*inch, 1.5*inch, 1.5*inch])
    comp_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, grey),
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#f0f0f0")),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    e.append(comp_table)

    e.append(Paragraph("OTHER TERMS", s["SectionHead"]))
    terms = [
        f"Reporting Manager: {data.reporting_manager}",
        f"Work Location: {data.work_location}",
        f"Probation Period: {data.probation_months} months",
        f"Notice Period: {data.notice_period_months} month(s)",
    ]
    for t in terms:
        e.append(Paragraph(f"• {t}", s["BodyLeft"]))
    if data.additional_benefits:
        e.append(Paragraph("<b>Additional Benefits:</b>", s["BoldBody"]))
        for b in data.additional_benefits:
            e.append(Paragraph(f"• {b}", s["BodyLeft"]))

    e.append(Spacer(1, 8))
    e.append(Paragraph(f"Please confirm your acceptance of this offer by signing and returning this letter on or before <b>{data.offer_expiry_date}</b>.", s["Body"]))
    e.append(Paragraph("We look forward to having you on our team.", s["Body"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph(f"For <b>{data.company_name}</b>", s["BodyLeft"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph("_______________<br/>Authorized Signatory", s["BodyLeft"]))
    e.append(Spacer(1, 30))
    e.append(Paragraph("<b>ACCEPTANCE</b>", s["BoldBody"]))
    e.append(Paragraph(f"I, {data.candidate_name}, hereby accept the above offer of employment.", s["Body"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph("Signature: _______________ &nbsp;&nbsp; Date: _______________", s["BodyLeft"]))

    return _build_pdf(e, "Offer_Letter")


def generate_freelancer_contract(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("FREELANCER SERVICE AGREEMENT", s["DocTitle"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"This Service Agreement (\"Agreement\") is entered into on <b>{data.start_date}</b> between:", s["Body"]))
    e.append(Paragraph(f"<b>Client:</b> {data.client_name}, {data.client_address}", s["BodyLeft"]))
    e.append(Paragraph(f"<b>Freelancer:</b> {data.freelancer_name}, {data.freelancer_address}", s["BodyLeft"]))

    e.append(_hr())
    e.append(Paragraph("1. SCOPE OF WORK", s["SectionHead"]))
    e.append(Paragraph(data.project_description, s["Body"]))

    e.append(Paragraph("DELIVERABLES:", s["BoldBody"]))
    for i, d in enumerate(data.deliverables):
        e.append(Paragraph(f"{i + 1}. {d}", s["BodyLeft"]))

    e.append(Paragraph("2. TIMELINE", s["SectionHead"]))
    e.append(Paragraph(f"Start Date: {data.start_date}<br/>End Date: {data.end_date}", s["BodyLeft"]))

    e.append(Paragraph("3. COMPENSATION", s["SectionHead"]))
    e.append(Paragraph(f"Total Fee: <b>{format_inr(data.total_fee)}</b><br/>Payment Schedule: {data.payment_schedule.title()}", s["BodyLeft"]))
    if data.advance_percentage:
        e.append(Paragraph(f"Advance: {data.advance_percentage}% ({format_inr(data.total_fee * data.advance_percentage / 100)})", s["BodyLeft"]))

    e.append(Paragraph("4. REVISIONS", s["SectionHead"]))
    e.append(Paragraph(f"The Client is entitled to {data.revision_rounds} rounds of revisions. Additional revisions will be charged separately at a mutually agreed rate.", s["Body"]))

    e.append(Paragraph("5. INTELLECTUAL PROPERTY", s["SectionHead"]))
    ip_text = {
        "client": "All intellectual property rights in the deliverables shall vest exclusively with the Client upon full payment.",
        "freelancer": "The Freelancer retains all intellectual property rights. The Client is granted a perpetual, non-exclusive license to use the deliverables.",
        "shared": "Both parties shall jointly own the intellectual property rights in the deliverables."
    }
    e.append(Paragraph(ip_text.get(data.ip_ownership, ip_text["client"]), s["Body"]))

    if data.confidentiality:
        e.append(Paragraph("6. CONFIDENTIALITY", s["SectionHead"]))
        e.append(Paragraph("Both parties agree to keep all project-related information confidential and shall not disclose it to third parties without written consent.", s["Body"]))

    e.append(Paragraph("7. TERMINATION", s["SectionHead"]))
    e.append(Paragraph(f"Either party may terminate this Agreement by providing {data.termination_notice_days} days' written notice. In case of termination, the Freelancer shall be compensated for work completed up to the date of termination.", s["Body"]))

    e.append(Paragraph("8. GOVERNING LAW", s["SectionHead"]))
    e.append(Paragraph(f"This Agreement shall be governed by the laws of India, with jurisdiction in the courts of {data.governing_state}.", s["Body"]))

    e.append(Spacer(1, 30))
    sig_data = [
        [f"Client: {data.client_name}", "", f"Freelancer: {data.freelancer_name}"],
        ["Signature: _______________", "", "Signature: _______________"],
        ["Date: _______________", "", "Date: _______________"],
    ]
    sig_table = Table(sig_data, colWidths=[2.5*inch, 1*inch, 2.5*inch])
    sig_table.setStyle(TableStyle([("FONTSIZE", (0, 0), (-1, -1), 10)]))
    e.append(sig_table)

    return _build_pdf(e, "Freelancer_Contract")


def generate_invoice(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("TAX INVOICE", s["DocTitle"]))
    e.append(_hr())

    info_data = [
        [Paragraph(f"<b>{data.seller_name}</b>", s["TableCellBold"]),
         Paragraph(f"<b>Invoice #:</b> {data.invoice_number}", s["TableCell"])],
        [Paragraph(data.seller_address, s["TableCell"]),
         Paragraph(f"<b>Date:</b> {data.invoice_date}", s["TableCell"])],
    ]
    if data.seller_gstin:
        info_data.append([Paragraph(f"GSTIN: {data.seller_gstin}", s["TableCell"]), Paragraph(f"<b>Due Date:</b> {data.due_date}", s["TableCell"])])
    if data.seller_pan:
        info_data.append([Paragraph(f"PAN: {data.seller_pan}", s["TableCell"]), Paragraph("", s["TableCell"])])
    info_table = Table(info_data, colWidths=[3.5*inch, 2.5*inch])
    info_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP")]))
    e.append(info_table)
    e.append(Spacer(1, 10))

    e.append(Paragraph("<b>Bill To:</b>", s["BoldBody"]))
    buyer_text = f"{data.buyer_name}<br/>{data.buyer_address}"
    if data.buyer_gstin:
        buyer_text += f"<br/>GSTIN: {data.buyer_gstin}"
    e.append(Paragraph(buyer_text, s["BodyLeft"]))
    e.append(Spacer(1, 10))

    has_hsn = any(item.hsn_code for item in data.items)
    header = ["#", "Description"]
    if has_hsn:
        header.append("HSN")
    header.extend(["Qty", "Rate (₹)", "Amount (₹)"])

    rows = [header]
    subtotal = 0.0
    for i, item in enumerate(data.items):
        amount = item.quantity * item.rate
        subtotal += amount
        row = [str(i + 1), item.description]
        if has_hsn:
            row.append(item.hsn_code or "")
        row.extend([str(item.quantity), format_inr(item.rate), format_inr(amount)])
        rows.append(row)

    if has_hsn:
        col_widths = [0.4*inch, 2.2*inch, 0.8*inch, 0.6*inch, 1*inch, 1*inch]
    else:
        col_widths = [0.4*inch, 2.8*inch, 0.8*inch, 1*inch, 1*inch]

    items_table = Table(rows, colWidths=col_widths)
    items_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, grey),
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#333333")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (-2, 1), (-1, -1), "RIGHT"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    e.append(items_table)
    e.append(Spacer(1, 10))

    discount = 0.0
    if data.discount_percentage:
        discount = subtotal * data.discount_percentage / 100.0
    taxable = subtotal - discount

    summary_rows = [["Subtotal", format_inr(subtotal)]]
    if discount > 0:
        summary_rows.append([f"Discount ({data.discount_percentage}%)", f"- {format_inr(discount)}"])
    summary_rows.append(["Taxable Amount", format_inr(taxable)])
    if data.is_igst:
        igst = taxable * data.gst_rate / 100.0
        summary_rows.append([f"IGST ({data.gst_rate}%)", format_inr(igst)])
        grand_total = taxable + igst
    else:
        half_rate = data.gst_rate / 2.0
        cgst = taxable * half_rate / 100.0
        sgst = cgst
        summary_rows.append([f"CGST ({half_rate}%)", format_inr(cgst)])
        summary_rows.append([f"SGST ({half_rate}%)", format_inr(sgst)])
        grand_total = taxable + cgst + sgst
    summary_rows.append([Paragraph("<b>Grand Total</b>", s["TableCellBold"]), Paragraph(f"<b>{format_inr(grand_total)}</b>", s["TableCellBold"])])

    summary_table = Table(summary_rows, colWidths=[1.5*inch, 1.2*inch], hAlign="RIGHT")
    summary_table.setStyle(TableStyle([
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("LINEABOVE", (0, -1), (-1, -1), 1, black),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    e.append(summary_table)

    if data.bank_name:
        e.append(Spacer(1, 14))
        e.append(Paragraph("BANK DETAILS", s["SectionHead"]))
        bank_text = f"Bank: {data.bank_name}"
        if data.account_number:
            bank_text += f"<br/>A/C No: {data.account_number}"
        if data.ifsc_code:
            bank_text += f"<br/>IFSC: {data.ifsc_code}"
        e.append(Paragraph(bank_text, s["BodyLeft"]))

    if data.notes:
        e.append(Spacer(1, 10))
        e.append(Paragraph(f"<b>Notes:</b> {data.notes}", s["BodyLeft"]))

    e.append(Spacer(1, 30))
    e.append(Paragraph(f"For <b>{data.seller_name}</b>", s["RightAligned"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph("Authorized Signatory", s["RightAligned"]))

    return _build_pdf(e, "Invoice")


def generate_power_of_attorney(data) -> bytes:
    s = _get_styles()
    e = []
    poa_label = "GENERAL" if data.poa_type == "general" else "SPECIAL"
    e.append(Paragraph(f"{poa_label} POWER OF ATTORNEY", s["DocTitle"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"KNOW ALL MEN BY THESE PRESENTS that I, <b>{data.principal_name}</b>, residing at {data.principal_address}"
                        + (f" (Aadhaar: {data.principal_aadhaar})" if data.principal_aadhaar else "")
                        + f", do hereby appoint and constitute <b>{data.attorney_name}</b>, residing at {data.attorney_address}"
                        + (f" (Aadhaar: {data.attorney_aadhaar})" if data.attorney_aadhaar else "")
                        + " as my true and lawful Attorney, to act on my behalf in the following matters:", s["Body"]))
    e.append(Spacer(1, 8))

    e.append(Paragraph("POWERS GRANTED", s["SectionHead"]))
    for i, power in enumerate(data.powers_granted):
        e.append(Paragraph(f"{i + 1}. {power}", s["Body"]))

    e.append(Paragraph("TERMS", s["SectionHead"]))
    e.append(Paragraph(f"This Power of Attorney is effective from <b>{data.effective_date}</b>"
                        + (f" and shall remain valid until <b>{data.expiry_date}</b>." if data.expiry_date else " and shall remain valid until revoked by the Principal in writing."), s["Body"]))
    e.append(Paragraph("The Attorney shall act in good faith and in the best interests of the Principal at all times.", s["Body"]))
    e.append(Paragraph("The Attorney shall not delegate any of the powers granted herein without the express written consent of the Principal.", s["Body"]))
    e.append(Paragraph(f"This Power of Attorney shall be governed by the laws of India, with jurisdiction in {data.governing_state}.", s["Body"]))

    e.append(Spacer(1, 20))
    e.append(Paragraph(f"IN WITNESS WHEREOF, I have executed this Power of Attorney on <b>{data.effective_date}</b>.", s["Body"]))
    e.append(Spacer(1, 30))

    e.append(Paragraph(f"<b>PRINCIPAL:</b> {data.principal_name}", s["BodyLeft"]))
    e.append(Paragraph("Signature: _______________", s["BodyLeft"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph(f"<b>ATTORNEY:</b> {data.attorney_name}", s["BodyLeft"]))
    e.append(Paragraph("Signature: _______________", s["BodyLeft"]))
    e.append(Spacer(1, 20))

    e.append(Paragraph("<b>WITNESSES:</b>", s["BoldBody"]))
    for i, w in enumerate(data.witnesses[:2]):
        e.append(Paragraph(f"{i + 1}. Name: {w.name}, Address: {w.address}", s["BodyLeft"]))
        e.append(Paragraph("   Signature: _______________", s["BodyLeft"]))

    return _build_pdf(e, "Power_of_Attorney")


def generate_partnership_deed(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("PARTNERSHIP DEED", s["DocTitle"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"This Partnership Deed is made and entered into on <b>{data.commencement_date}</b> by and between the following partners:", s["Body"]))
    for i, p in enumerate(data.partners):
        e.append(Paragraph(f"<b>Partner {i+1}:</b> {p.name}, residing at {p.address}", s["BodyLeft"]))
    e.append(Spacer(1, 6))

    clauses = []
    clauses.append(("1. NAME OF THE FIRM", f"The partnership firm shall carry on business under the name and style of <b>\"{data.firm_name}\"</b>."))
    clauses.append(("2. PLACE OF BUSINESS", f"The principal place of business shall be at {data.firm_address}."))
    clauses.append(("3. NATURE OF BUSINESS", f"The firm shall carry on the business of {data.business_nature}."))
    clauses.append(("4. COMMENCEMENT", f"The partnership shall commence from {data.commencement_date}" + (" and shall continue at the will of the partners." if data.duration == "at-will" else " for a fixed term as agreed.")))

    for title, text in clauses:
        e.append(Paragraph(title, s["SectionHead"]))
        e.append(Paragraph(text, s["Body"]))

    e.append(Paragraph("5. CAPITAL CONTRIBUTION", s["SectionHead"]))
    cap_header = ["Partner", "Capital (₹)", "Profit Share (%)"]
    cap_rows = [cap_header]
    for p in data.partners:
        cap_rows.append([p.name, format_inr(p.capital_contribution), f"{p.profit_share_percentage}%"])
    cap_table = Table(cap_rows, colWidths=[2.5*inch, 1.5*inch, 1.5*inch])
    cap_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, grey),
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#f0f0f0")),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (1, 1), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    e.append(cap_table)

    e.append(Paragraph("6. BANKING", s["SectionHead"]))
    bank_text = f"The bank account of the firm shall be maintained at <b>{data.bank_name}</b>."
    if data.bank_account:
        bank_text += f" Account Number: {data.bank_account}."
    e.append(Paragraph(bank_text, s["Body"]))

    e.append(Paragraph("7. FINANCIAL YEAR", s["SectionHead"]))
    e.append(Paragraph(f"The financial year shall commence on {data.financial_year_start} each year.", s["Body"]))

    e.append(Paragraph("8. DISPUTE RESOLUTION", s["SectionHead"]))
    if data.dispute_resolution == "arbitration":
        e.append(Paragraph(f"Any disputes arising between the partners shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in {data.governing_state}.", s["Body"]))
    else:
        e.append(Paragraph(f"Any disputes shall be subject to the exclusive jurisdiction of the courts in {data.governing_state}.", s["Body"]))

    e.append(Paragraph("9. GENERAL PROVISIONS", s["SectionHead"]))
    general = [
        "No partner shall carry on any business other than the firm's business without the consent of all partners.",
        "Proper books of accounts shall be maintained at the firm's principal place of business.",
        "Each partner shall devote their full time and attention to the business of the firm.",
        "The firm shall not be dissolved by the death or retirement of any partner. The remaining partners shall have the option to continue the business.",
    ]
    for g in general:
        e.append(Paragraph(f"• {g}", s["Body"]))

    if data.additional_clauses:
        e.append(Paragraph("10. ADDITIONAL CLAUSES", s["SectionHead"]))
        for i, c in enumerate(data.additional_clauses):
            e.append(Paragraph(f"{i + 1}. {c}", s["Body"]))

    e.append(Spacer(1, 20))
    e.append(Paragraph("IN WITNESS WHEREOF, the parties have set their hands on the day, month, and year first above written.", s["Body"]))
    e.append(Spacer(1, 20))
    for i, p in enumerate(data.partners):
        e.append(Paragraph(f"Partner {i+1}: {p.name}", s["BodyLeft"]))
        e.append(Paragraph("Signature: _______________", s["BodyLeft"]))
        e.append(Spacer(1, 10))

    e.append(Paragraph("<b>WITNESSES:</b>", s["BoldBody"]))
    e.append(Paragraph("1. _______________ &nbsp;&nbsp; 2. _______________", s["BodyLeft"]))

    return _build_pdf(e, "Partnership_Deed")


def generate_resignation_letter(data) -> bytes:
    s = _get_styles()
    e = []

    e.append(Paragraph(f"Date: {data.resignation_date}", s["RightAligned"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph(f"To,<br/>{data.manager_name}<br/>{data.manager_designation}<br/>{data.company_name}", s["BodyLeft"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph("<b>Subject: Resignation from Services</b>", s["BodyLeft"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph(f"Dear {data.manager_name},", s["Body"]))

    body = f"I, {data.employee_name}, working as {data.employee_designation} in the {data.department} department"
    if data.employee_id:
        body += f" (Employee ID: {data.employee_id})"
    body += f", hereby tender my resignation from my services at {data.company_name}."
    e.append(Paragraph(body, s["Body"]))

    if data.reason:
        e.append(Paragraph(f"The reason for my resignation is: {data.reason}", s["Body"]))

    e.append(Paragraph(f"As per my notice period of {data.notice_period_days} days, my last working day will be <b>{data.last_working_date}</b>.", s["Body"]))
    e.append(Paragraph("I am willing to complete all pending tasks and assist in the transition of my responsibilities to ensure a smooth handover.", s["Body"]))
    e.append(Paragraph(f"I am grateful for the opportunities and experiences I have gained during my tenure at {data.company_name}. I wish the organization continued success.", s["Body"]))
    e.append(Paragraph("I request you to kindly accept my resignation and initiate the necessary formalities.", s["Body"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph("Thanking you,", s["Body"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph(f"Yours sincerely,<br/>{data.employee_name}<br/>{data.employee_designation}", s["BodyLeft"]))
    if data.employee_id:
        e.append(Paragraph(f"Employee ID: {data.employee_id}", s["BodyLeft"]))

    return _build_pdf(e, "Resignation_Letter")


def generate_experience_certificate(data) -> bytes:
    s = _get_styles()
    e = []
    if data.company_logo_text:
        e.append(Paragraph(data.company_logo_text, ParagraphStyle("Logo", parent=s["DocTitle"], fontSize=20, textColor=HexColor("#333333"))))
    e.append(Paragraph(data.company_name, s["DocTitle"]))
    e.append(Paragraph(data.company_address, s["DocSubtitle"]))
    e.append(_hr())

    e.append(Paragraph(f"Date: {data.issue_date}", s["RightAligned"]))
    e.append(Spacer(1, 10))
    e.append(Paragraph("EXPERIENCE CERTIFICATE", s["DocTitle"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph("<b>TO WHOM IT MAY CONCERN</b>", ParagraphStyle("CenterBold", parent=s["Body"], alignment=TA_CENTER, fontName="Helvetica-Bold")))
    e.append(Spacer(1, 10))

    e.append(Paragraph(f"This is to certify that <b>{data.employee_name}</b> was employed with {data.company_name} as <b>{data.employee_designation}</b> in the {data.department} department from <b>{data.date_of_joining}</b> to <b>{data.date_of_leaving}</b>.", s["Body"]))

    if data.responsibilities:
        e.append(Paragraph("During their tenure, they were responsible for:", s["Body"]))
        for r in data.responsibilities:
            e.append(Paragraph(f"• {r}", s["BodyLeft"]))

    if data.performance_rating:
        rating_text = {
            "excellent": "We found their performance to be excellent throughout their tenure.",
            "good": "We found their performance to be good and satisfactory.",
            "satisfactory": "Their performance was satisfactory during their association with us."
        }
        e.append(Spacer(1, 6))
        e.append(Paragraph(rating_text.get(data.performance_rating, ""), s["Body"]))

    e.append(Spacer(1, 6))
    e.append(Paragraph(f"We wish {data.employee_name} all the best in their future endeavours.", s["Body"]))
    e.append(Spacer(1, 30))
    e.append(Paragraph(f"For <b>{data.company_name}</b>", s["BodyLeft"]))
    e.append(Spacer(1, 20))
    e.append(Paragraph(f"_______________<br/>{data.signatory_name}<br/>{data.signatory_designation}", s["BodyLeft"]))

    return _build_pdf(e, "Experience_Certificate")


def generate_salary_slip(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph(data.company_name, s["DocTitle"]))
    e.append(Paragraph(data.company_address, s["DocSubtitle"]))
    e.append(_hr())
    e.append(Paragraph(f"SALARY SLIP — {data.month} {data.year}", s["DocTitle"]))
    e.append(Spacer(1, 6))

    emp_info = [
        [f"Employee Name: {data.employee_name}", f"Employee ID: {data.employee_id}"],
        [f"Designation: {data.designation}", f"Department: {data.department}"],
        [f"Working Days: {data.total_working_days}", f"Days Worked: {data.days_worked}"],
    ]
    if data.pan_number:
        emp_info.append([f"PAN: {data.pan_number}", f"UAN: {data.uan_number or 'N/A'}"])
    if data.bank_name:
        emp_info.append([f"Bank: {data.bank_name}", f"A/C: {data.bank_account or 'N/A'}"])

    emp_table = Table(emp_info, colWidths=[3*inch, 3*inch])
    emp_table.setStyle(TableStyle([
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#cccccc")),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ]))
    e.append(emp_table)
    e.append(Spacer(1, 10))

    proration = data.days_worked / data.total_working_days if data.total_working_days > 0 else 1
    earnings = [
        ("Basic Salary", data.basic_salary * proration),
        ("HRA", data.hra * proration),
    ]
    if data.dearness_allowance:
        earnings.append(("Dearness Allowance", data.dearness_allowance * proration))
    if data.conveyance_allowance:
        earnings.append(("Conveyance Allowance", data.conveyance_allowance * proration))
    if data.medical_allowance:
        earnings.append(("Medical Allowance", data.medical_allowance * proration))
    if data.special_allowance:
        earnings.append(("Special Allowance", data.special_allowance * proration))
    if data.other_earnings:
        earnings.append(("Other Earnings", data.other_earnings * proration))
    total_earnings = sum(v for _, v in earnings)

    deductions = [("PF", data.pf_deduction)]
    if data.esi_deduction:
        deductions.append(("ESI", data.esi_deduction))
    if data.professional_tax:
        deductions.append(("Professional Tax", data.professional_tax))
    if data.income_tax:
        deductions.append(("Income Tax (TDS)", data.income_tax))
    if data.other_deductions:
        deductions.append(("Other Deductions", data.other_deductions))
    total_deductions = sum(v for _, v in deductions)

    max_rows = max(len(earnings), len(deductions))
    salary_rows = [[
        Paragraph("<b>Earnings</b>", s["TableCellBold"]),
        Paragraph("<b>Amount (₹)</b>", s["TableCellBold"]),
        Paragraph("<b>Deductions</b>", s["TableCellBold"]),
        Paragraph("<b>Amount (₹)</b>", s["TableCellBold"]),
    ]]
    for i in range(max_rows):
        row = []
        if i < len(earnings):
            row.extend([earnings[i][0], format_inr(earnings[i][1])])
        else:
            row.extend(["", ""])
        if i < len(deductions):
            row.extend([deductions[i][0], format_inr(deductions[i][1])])
        else:
            row.extend(["", ""])
        salary_rows.append(row)

    salary_rows.append([
        Paragraph("<b>Total Earnings</b>", s["TableCellBold"]),
        Paragraph(f"<b>{format_inr(total_earnings)}</b>", s["TableCellBold"]),
        Paragraph("<b>Total Deductions</b>", s["TableCellBold"]),
        Paragraph(f"<b>{format_inr(total_deductions)}</b>", s["TableCellBold"]),
    ])

    salary_table = Table(salary_rows, colWidths=[1.8*inch, 1.2*inch, 1.8*inch, 1.2*inch])
    salary_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, grey),
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#f0f0f0")),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ("ALIGN", (3, 0), (3, -1), "RIGHT"),
        ("LINEABOVE", (0, -1), (-1, -1), 1, black),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    e.append(salary_table)
    e.append(Spacer(1, 10))

    net_pay = total_earnings - total_deductions
    e.append(Paragraph(f"<b>Net Pay: {format_inr(net_pay)}</b>", ParagraphStyle("NetPay", parent=s["Body"], fontSize=13, fontName="Helvetica-Bold", alignment=TA_CENTER)))
    e.append(Spacer(1, 20))

    e.append(Paragraph("<i>This is a system-generated salary slip and does not require a signature.</i>", s["DocSubtitle"]))

    return _build_pdf(e, "Salary_Slip")


def generate_legal_notice(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("LEGAL NOTICE", s["DocTitle"]))
    if data.sender_through_advocate:
        e.append(Paragraph(f"Through: {data.sender_through_advocate}, Advocate", s["DocSubtitle"]))
    e.append(_hr())

    e.append(Paragraph(f"Date: {data.notice_date}", s["RightAligned"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph("<b>NOTICE UNDER SECTION 80 CPC / GENERAL LEGAL NOTICE</b>", ParagraphStyle("NoticeSub", parent=s["Body"], alignment=TA_CENTER, fontName="Helvetica-Bold")))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"<b>To,</b><br/>{data.recipient_name}<br/>{data.recipient_address}", s["BodyLeft"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(f"<b>From,</b><br/>{data.sender_name}<br/>{data.sender_address}", s["BodyLeft"]))
    e.append(Spacer(1, 6))

    e.append(Paragraph(f"<b>Subject: {data.subject}</b>", s["BodyLeft"]))
    e.append(Spacer(1, 6))

    if data.sender_through_advocate:
        e.append(Paragraph(f"Under instructions and on behalf of my client, {data.sender_name}, I hereby serve upon you the following legal notice:", s["Body"]))
    else:
        e.append(Paragraph("I hereby serve upon you the following legal notice:", s["Body"]))

    e.append(Paragraph("FACTS", s["SectionHead"]))
    for i, fact in enumerate(data.facts):
        e.append(Paragraph(f"{i + 1}. {fact}", s["Body"]))

    e.append(Paragraph("LEGAL GROUNDS", s["SectionHead"]))
    for i, ground in enumerate(data.legal_grounds):
        e.append(Paragraph(f"{i + 1}. {ground}", s["Body"]))

    e.append(Paragraph("RELIEF SOUGHT", s["SectionHead"]))
    for i, relief in enumerate(data.relief_sought):
        e.append(Paragraph(f"{i + 1}. {relief}", s["Body"]))

    e.append(Spacer(1, 10))
    e.append(Paragraph(f"You are hereby called upon to comply with the above demands within <b>{data.compliance_days} days</b> from the receipt of this notice, failing which my client shall be constrained to initiate appropriate legal proceedings against you before the competent courts in <b>{data.governing_state}</b>, at your risk, cost, and consequences.", s["Body"]))

    e.append(Spacer(1, 20))
    if data.sender_through_advocate:
        e.append(Paragraph(f"{data.sender_through_advocate}<br/>Advocate<br/>On behalf of {data.sender_name}", s["BodyLeft"]))
    else:
        e.append(Paragraph(f"Yours faithfully,<br/>{data.sender_name}", s["BodyLeft"]))

    return _build_pdf(e, "Legal_Notice")


def generate_affidavit(data) -> bytes:
    s = _get_styles()
    e = []
    e.append(Paragraph("AFFIDAVIT", s["DocTitle"]))
    e.append(Paragraph(f"({data.purpose.title()})", s["DocSubtitle"]))
    e.append(_hr())

    e.append(Paragraph(f"I, <b>{data.deponent_name}</b>, aged {data.deponent_age} years, S/o / D/o / W/o <b>{data.deponent_father_name}</b>, Occupation: {data.deponent_occupation}, residing at {data.deponent_address}, do hereby solemnly affirm and state on oath as under:", s["Body"]))
    e.append(Spacer(1, 10))

    for i, stmt in enumerate(data.statements):
        e.append(Paragraph(f"{i + 1}. That {stmt}", s["Body"]))

    e.append(Spacer(1, 6))
    e.append(Paragraph(f"I, {data.deponent_name}, do hereby declare that the statements made in this affidavit are true and correct to the best of my knowledge and belief. Nothing material has been concealed therefrom.", s["Body"]))

    e.append(Spacer(1, 20))
    e.append(Paragraph(f"Place: {data.place}", s["BodyLeft"]))
    e.append(Paragraph(f"Date: {data.date}", s["BodyLeft"]))
    e.append(Spacer(1, 30))
    e.append(Paragraph("DEPONENT", s["RightAligned"]))
    e.append(Spacer(1, 6))
    e.append(Paragraph(f"({data.deponent_name})", s["RightAligned"]))
    e.append(Spacer(1, 30))
    e.append(Paragraph("<b>VERIFICATION</b>", s["BoldBody"]))
    e.append(Paragraph(f"Verified at {data.place} on this {data.date} that the contents of the above affidavit are true and correct to the best of my knowledge and belief.", s["Body"]))

    if data.notary_name:
        e.append(Spacer(1, 30))
        e.append(Paragraph(f"Before me,<br/>{data.notary_name}<br/>Notary Public", s["BodyLeft"]))

    return _build_pdf(e, "Affidavit")


def _ordinal(n: int) -> str:
    if 11 <= (n % 100) <= 13:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suffix}"

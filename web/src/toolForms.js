export const toolForms = {
  'rental-agreement': {
    title: 'Rental Agreement Generator',
    metaTitle: 'Free Rental Agreement Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional rental/lease agreement for India with customizable clauses. Download as PDF or DOCX. Free, no login required.',
    sections: [
      {
        heading: 'Landlord Details',
        fields: [
          { name: 'landlord_name', label: 'Landlord Name', required: true },
          { name: 'landlord_address', label: 'Landlord Address', required: true, type: 'textarea' },
          { name: 'landlord_aadhaar', label: 'Landlord Aadhaar (Optional)' },
        ],
      },
      {
        heading: 'Tenant Details',
        fields: [
          { name: 'tenant_name', label: 'Tenant Name', required: true },
          { name: 'tenant_address', label: 'Tenant Address', required: true, type: 'textarea' },
          { name: 'tenant_aadhaar', label: 'Tenant Aadhaar (Optional)' },
        ],
      },
      {
        heading: 'Property Details',
        fields: [
          { name: 'property_address', label: 'Property Address', required: true, type: 'textarea' },
          { name: 'property_type', label: 'Property Type', type: 'select', options: ['flat', 'house', 'shop', 'office'] },
          { name: 'purpose', label: 'Purpose', type: 'select', options: ['residential', 'commercial'] },
          { name: 'furnishing', label: 'Furnishing', type: 'select', options: ['furnished', 'semi-furnished', 'unfurnished'] },
        ],
      },
      {
        heading: 'Financial Terms',
        fields: [
          { name: 'monthly_rent', label: 'Monthly Rent (₹)', type: 'number', required: true },
          { name: 'security_deposit', label: 'Security Deposit (₹)', type: 'number', required: true },
          { name: 'maintenance_charges', label: 'Maintenance Charges (₹, Optional)', type: 'number' },
        ],
      },
      {
        heading: 'Duration & Terms',
        fields: [
          { name: 'lease_start_date', label: 'Lease Start Date (DD/MM/YYYY)', required: true, placeholder: '01/01/2025' },
          { name: 'lease_duration_months', label: 'Lease Duration (Months)', type: 'number', required: true, placeholder: '11' },
          { name: 'rent_due_day', label: 'Rent Due Day', type: 'number', placeholder: '5' },
          { name: 'notice_period_months', label: 'Notice Period (Months)', type: 'number', placeholder: '1' },
        ],
      },
    ],
    listFields: [
      { name: 'additional_clauses', label: 'Additional Clauses', placeholder: 'Add a custom clause' },
    ],
    defaults: { property_type: 'flat', purpose: 'residential', furnishing: 'unfurnished', lease_duration_months: 11, rent_due_day: 5, notice_period_months: 1 },
  },

  'nda': {
    title: 'NDA Generator',
    metaTitle: 'Free NDA Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional Non-Disclosure Agreement (mutual or one-way) for India. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Agreement Type',
        fields: [
          { name: 'nda_type', label: 'NDA Type', type: 'select', options: [{ value: 'mutual', label: 'Mutual NDA' }, { value: 'one-way', label: 'One-Way NDA' }], required: true },
          { name: 'effective_date', label: 'Effective Date (DD/MM/YYYY)', required: true },
          { name: 'confidentiality_period_years', label: 'Confidentiality Period (Years)', type: 'number', required: true },
          { name: 'purpose', label: 'Purpose of Disclosure', required: true, type: 'textarea' },
          { name: 'governing_state', label: 'Governing State', required: true, placeholder: 'e.g., Maharashtra' },
        ],
      },
      {
        heading: 'Disclosing Party',
        fields: [
          { name: 'disclosing_party_name', label: 'Name', required: true },
          { name: 'disclosing_party_address', label: 'Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Receiving Party',
        fields: [
          { name: 'receiving_party_name', label: 'Name', required: true },
          { name: 'receiving_party_address', label: 'Address', required: true, type: 'textarea' },
        ],
      },
    ],
    listFields: [
      { name: 'additional_exclusions', label: 'Additional Exclusions', placeholder: 'Add an exclusion' },
    ],
    defaults: { nda_type: 'mutual', confidentiality_period_years: 2 },
  },

  'offer-letter': {
    title: 'Offer Letter Generator',
    metaTitle: 'Free Employment Offer Letter Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional employment offer letter with compensation breakdown. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Company Details',
        fields: [
          { name: 'company_name', label: 'Company Name', required: true },
          { name: 'company_address', label: 'Company Address', required: true, type: 'textarea' },
          { name: 'company_logo_text', label: 'Logo Text (Optional)' },
        ],
      },
      {
        heading: 'Candidate Details',
        fields: [
          { name: 'candidate_name', label: 'Candidate Name', required: true },
          { name: 'candidate_address', label: 'Candidate Address', required: true, type: 'textarea' },
          { name: 'designation', label: 'Designation', required: true },
          { name: 'department', label: 'Department', required: true },
        ],
      },
      {
        heading: 'Compensation (Monthly)',
        fields: [
          { name: 'ctc_annual', label: 'Annual CTC (₹)', type: 'number', required: true },
          { name: 'basic_salary', label: 'Basic Salary (₹)', type: 'number', required: true },
          { name: 'hra', label: 'HRA (₹)', type: 'number', required: true },
          { name: 'special_allowance', label: 'Special Allowance (₹)', type: 'number', required: true },
          { name: 'pf_contribution', label: 'PF Contribution (₹)', type: 'number', required: true },
        ],
      },
      {
        heading: 'Other Details',
        fields: [
          { name: 'date_of_joining', label: 'Date of Joining (DD/MM/YYYY)', required: true },
          { name: 'reporting_manager', label: 'Reporting Manager', required: true },
          { name: 'work_location', label: 'Work Location', required: true },
          { name: 'probation_months', label: 'Probation (Months)', type: 'number' },
          { name: 'notice_period_months', label: 'Notice Period (Months)', type: 'number' },
          { name: 'offer_date', label: 'Offer Date (DD/MM/YYYY)', required: true },
          { name: 'offer_expiry_date', label: 'Offer Expiry Date (DD/MM/YYYY)', required: true },
        ],
      },
    ],
    listFields: [
      { name: 'additional_benefits', label: 'Additional Benefits', placeholder: 'e.g., Health Insurance' },
    ],
    defaults: { probation_months: 6, notice_period_months: 1 },
  },

  'freelancer-contract': {
    title: 'Freelancer Contract Generator',
    metaTitle: 'Free Freelancer Contract Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional freelancer service agreement with IP and payment terms. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Client Details',
        fields: [
          { name: 'client_name', label: 'Client Name', required: true },
          { name: 'client_address', label: 'Client Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Freelancer Details',
        fields: [
          { name: 'freelancer_name', label: 'Freelancer Name', required: true },
          { name: 'freelancer_address', label: 'Freelancer Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Project Details',
        fields: [
          { name: 'project_description', label: 'Project Description', required: true, type: 'textarea' },
          { name: 'start_date', label: 'Start Date (DD/MM/YYYY)', required: true },
          { name: 'end_date', label: 'End Date (DD/MM/YYYY)', required: true },
        ],
      },
      {
        heading: 'Terms',
        fields: [
          { name: 'total_fee', label: 'Total Fee (₹)', type: 'number', required: true },
          { name: 'payment_schedule', label: 'Payment Schedule', type: 'select', options: ['milestone', 'monthly', 'on-completion'] },
          { name: 'advance_percentage', label: 'Advance (%)', type: 'number' },
          { name: 'revision_rounds', label: 'Revision Rounds', type: 'number' },
          { name: 'ip_ownership', label: 'IP Ownership', type: 'select', options: [{ value: 'client', label: 'Client' }, { value: 'freelancer', label: 'Freelancer' }, { value: 'shared', label: 'Shared' }] },
          { name: 'termination_notice_days', label: 'Termination Notice (Days)', type: 'number' },
          { name: 'governing_state', label: 'Governing State', required: true },
        ],
      },
    ],
    listFields: [
      { name: 'deliverables', label: 'Deliverables', placeholder: 'Add a deliverable', required: true },
    ],
    defaults: { payment_schedule: 'milestone', revision_rounds: 2, ip_ownership: 'client', termination_notice_days: 15, confidentiality: true },
  },

  'invoice': {
    title: 'Invoice Generator',
    metaTitle: 'Free GST Invoice Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional GST invoice with CGST/SGST/IGST breakdown. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Invoice Details',
        fields: [
          { name: 'invoice_number', label: 'Invoice Number', required: true, placeholder: 'INV-001' },
          { name: 'invoice_date', label: 'Invoice Date (DD/MM/YYYY)', required: true },
          { name: 'due_date', label: 'Due Date (DD/MM/YYYY)', required: true },
        ],
      },
      {
        heading: 'Seller Details',
        fields: [
          { name: 'seller_name', label: 'Seller / Business Name', required: true },
          { name: 'seller_address', label: 'Seller Address', required: true, type: 'textarea' },
          { name: 'seller_gstin', label: 'Seller GSTIN' },
          { name: 'seller_pan', label: 'Seller PAN' },
        ],
      },
      {
        heading: 'Buyer Details',
        fields: [
          { name: 'buyer_name', label: 'Buyer Name', required: true },
          { name: 'buyer_address', label: 'Buyer Address', required: true, type: 'textarea' },
          { name: 'buyer_gstin', label: 'Buyer GSTIN' },
        ],
      },
      {
        heading: 'Tax & Discount',
        fields: [
          { name: 'gst_rate', label: 'GST Rate (%)', type: 'number', required: true },
          { name: 'is_igst', label: 'Tax Type', type: 'select', options: [{ value: 'false', label: 'CGST + SGST (Intra-state)' }, { value: 'true', label: 'IGST (Inter-state)' }] },
          { name: 'discount_percentage', label: 'Discount (%)', type: 'number' },
        ],
      },
      {
        heading: 'Bank Details (Optional)',
        fields: [
          { name: 'bank_name', label: 'Bank Name' },
          { name: 'account_number', label: 'Account Number' },
          { name: 'ifsc_code', label: 'IFSC Code' },
          { name: 'notes', label: 'Notes', type: 'textarea' },
        ],
      },
    ],
    listFields: [],
    itemFields: {
      name: 'items',
      label: 'Line Items',
      fields: [
        { name: 'description', label: 'Description', required: true },
        { name: 'quantity', label: 'Qty', type: 'number', required: true },
        { name: 'rate', label: 'Rate (₹)', type: 'number', required: true },
        { name: 'hsn_code', label: 'HSN Code' },
      ],
    },
    defaults: { gst_rate: 18, is_igst: 'false' },
    transformBeforeSubmit: (data) => ({
      ...data,
      is_igst: data.is_igst === 'true',
      gst_rate: parseFloat(data.gst_rate) || 18,
      discount_percentage: data.discount_percentage ? parseFloat(data.discount_percentage) : null,
      items: (data.items || []).map((item) => ({
        ...item,
        quantity: parseFloat(item.quantity) || 1,
        rate: parseFloat(item.rate) || 0,
      })),
    }),
  },

  'power-of-attorney': {
    title: 'Power of Attorney Generator',
    metaTitle: 'Free Power of Attorney Generator for India | DoAide Legal',
    metaDescription: 'Generate a general or special Power of Attorney for India. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'POA Type',
        fields: [
          { name: 'poa_type', label: 'Type', type: 'select', options: [{ value: 'general', label: 'General POA' }, { value: 'special', label: 'Special POA' }], required: true },
          { name: 'effective_date', label: 'Effective Date (DD/MM/YYYY)', required: true },
          { name: 'expiry_date', label: 'Expiry Date (DD/MM/YYYY, Optional)' },
          { name: 'governing_state', label: 'Governing State', required: true },
        ],
      },
      {
        heading: 'Principal (Granting Power)',
        fields: [
          { name: 'principal_name', label: 'Name', required: true },
          { name: 'principal_address', label: 'Address', required: true, type: 'textarea' },
          { name: 'principal_aadhaar', label: 'Aadhaar (Optional)' },
        ],
      },
      {
        heading: 'Attorney (Receiving Power)',
        fields: [
          { name: 'attorney_name', label: 'Name', required: true },
          { name: 'attorney_address', label: 'Address', required: true, type: 'textarea' },
          { name: 'attorney_aadhaar', label: 'Aadhaar (Optional)' },
        ],
      },
    ],
    listFields: [
      { name: 'powers_granted', label: 'Powers Granted', placeholder: 'e.g., Sell property at...', required: true },
    ],
    witnessFields: { name: 'witnesses', count: 2 },
    defaults: { poa_type: 'general' },
    transformBeforeSubmit: (data) => ({
      ...data,
      expiry_date: data.expiry_date || null,
    }),
  },

  'partnership-deed': {
    title: 'Partnership Deed Generator',
    metaTitle: 'Free Partnership Deed Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional partnership deed with capital and profit sharing. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Firm Details',
        fields: [
          { name: 'firm_name', label: 'Firm Name', required: true },
          { name: 'firm_address', label: 'Firm Address', required: true, type: 'textarea' },
          { name: 'business_nature', label: 'Nature of Business', required: true },
          { name: 'commencement_date', label: 'Commencement Date (DD/MM/YYYY)', required: true },
          { name: 'duration', label: 'Duration', type: 'select', options: [{ value: 'at-will', label: 'At Will' }, { value: 'fixed', label: 'Fixed Term' }] },
        ],
      },
      {
        heading: 'Banking & Legal',
        fields: [
          { name: 'bank_name', label: 'Bank Name', required: true },
          { name: 'bank_account', label: 'Bank Account Number' },
          { name: 'financial_year_start', label: 'Financial Year Start', placeholder: '1st April' },
          { name: 'dispute_resolution', label: 'Dispute Resolution', type: 'select', options: ['arbitration', 'court'] },
          { name: 'governing_state', label: 'Governing State', required: true },
        ],
      },
    ],
    listFields: [
      { name: 'additional_clauses', label: 'Additional Clauses', placeholder: 'Add a clause' },
    ],
    partnerFields: { name: 'partners', label: 'Partners' },
    defaults: { duration: 'at-will', financial_year_start: '1st April', dispute_resolution: 'arbitration' },
  },

  'resignation-letter': {
    title: 'Resignation Letter Generator',
    metaTitle: 'Free Resignation Letter Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional resignation letter with notice period details. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Employee Details',
        fields: [
          { name: 'employee_name', label: 'Your Name', required: true },
          { name: 'employee_designation', label: 'Your Designation', required: true },
          { name: 'employee_id', label: 'Employee ID (Optional)' },
          { name: 'department', label: 'Department', required: true },
          { name: 'company_name', label: 'Company Name', required: true },
        ],
      },
      {
        heading: 'Manager Details',
        fields: [
          { name: 'manager_name', label: 'Manager Name', required: true },
          { name: 'manager_designation', label: 'Manager Designation', required: true },
        ],
      },
      {
        heading: 'Resignation Details',
        fields: [
          { name: 'resignation_date', label: 'Resignation Date (DD/MM/YYYY)', required: true },
          { name: 'last_working_date', label: 'Last Working Date (DD/MM/YYYY)', required: true },
          { name: 'notice_period_days', label: 'Notice Period (Days)', type: 'number', required: true },
          { name: 'reason', label: 'Reason (Optional)', type: 'textarea' },
        ],
      },
    ],
    defaults: { notice_period_days: 30 },
  },

  'experience-certificate': {
    title: 'Experience Certificate Generator',
    metaTitle: 'Free Experience Certificate Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional work experience certificate. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Company Details',
        fields: [
          { name: 'company_name', label: 'Company Name', required: true },
          { name: 'company_address', label: 'Company Address', required: true, type: 'textarea' },
          { name: 'company_logo_text', label: 'Logo Text (Optional)' },
        ],
      },
      {
        heading: 'Employee Details',
        fields: [
          { name: 'employee_name', label: 'Employee Name', required: true },
          { name: 'employee_designation', label: 'Designation', required: true },
          { name: 'department', label: 'Department', required: true },
          { name: 'date_of_joining', label: 'Date of Joining (DD/MM/YYYY)', required: true },
          { name: 'date_of_leaving', label: 'Date of Leaving (DD/MM/YYYY)', required: true },
          { name: 'performance_rating', label: 'Performance Rating', type: 'select', options: ['excellent', 'good', 'satisfactory'] },
        ],
      },
      {
        heading: 'Certificate Details',
        fields: [
          { name: 'issue_date', label: 'Issue Date (DD/MM/YYYY)', required: true },
          { name: 'signatory_name', label: 'Signatory Name', required: true },
          { name: 'signatory_designation', label: 'Signatory Designation', required: true },
        ],
      },
    ],
    listFields: [
      { name: 'responsibilities', label: 'Responsibilities', placeholder: 'Add a responsibility' },
    ],
    defaults: {},
  },

  'salary-slip': {
    title: 'Salary Slip Generator',
    metaTitle: 'Free Salary Slip Generator for India | DoAide Legal',
    metaDescription: 'Generate a professional monthly salary slip with Basic, HRA, DA, PF, ESI, PT. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Company Details',
        fields: [
          { name: 'company_name', label: 'Company Name', required: true },
          { name: 'company_address', label: 'Company Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Employee Details',
        fields: [
          { name: 'employee_name', label: 'Employee Name', required: true },
          { name: 'employee_id', label: 'Employee ID', required: true },
          { name: 'designation', label: 'Designation', required: true },
          { name: 'department', label: 'Department', required: true },
          { name: 'pan_number', label: 'PAN Number' },
          { name: 'uan_number', label: 'UAN Number' },
          { name: 'bank_name', label: 'Bank Name' },
          { name: 'bank_account', label: 'Bank Account Number' },
        ],
      },
      {
        heading: 'Pay Period',
        fields: [
          { name: 'month', label: 'Month', type: 'select', options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], required: true },
          { name: 'year', label: 'Year', type: 'number', required: true, placeholder: '2025' },
          { name: 'total_working_days', label: 'Total Working Days', type: 'number', required: true },
          { name: 'days_worked', label: 'Days Worked', type: 'number', required: true },
        ],
      },
      {
        heading: 'Earnings (Monthly)',
        fields: [
          { name: 'basic_salary', label: 'Basic Salary (₹)', type: 'number', required: true },
          { name: 'hra', label: 'HRA (₹)', type: 'number', required: true },
          { name: 'dearness_allowance', label: 'Dearness Allowance (₹)', type: 'number' },
          { name: 'conveyance_allowance', label: 'Conveyance Allowance (₹)', type: 'number' },
          { name: 'medical_allowance', label: 'Medical Allowance (₹)', type: 'number' },
          { name: 'special_allowance', label: 'Special Allowance (₹)', type: 'number' },
          { name: 'other_earnings', label: 'Other Earnings (₹)', type: 'number' },
        ],
      },
      {
        heading: 'Deductions',
        fields: [
          { name: 'pf_deduction', label: 'PF Deduction (₹)', type: 'number', required: true },
          { name: 'esi_deduction', label: 'ESI Deduction (₹)', type: 'number' },
          { name: 'professional_tax', label: 'Professional Tax (₹)', type: 'number' },
          { name: 'income_tax', label: 'Income Tax / TDS (₹)', type: 'number' },
          { name: 'other_deductions', label: 'Other Deductions (₹)', type: 'number' },
        ],
      },
    ],
    defaults: { dearness_allowance: 0, conveyance_allowance: 0, medical_allowance: 0, special_allowance: 0, other_earnings: 0, esi_deduction: 0, professional_tax: 0, income_tax: 0, other_deductions: 0 },
  },

  'legal-notice': {
    title: 'Legal Notice Generator',
    metaTitle: 'Free Legal Notice Generator for India | DoAide Legal',
    metaDescription: 'Generate a formal legal notice with facts, legal grounds, and relief sought. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Sender Details',
        fields: [
          { name: 'sender_name', label: 'Sender Name', required: true },
          { name: 'sender_address', label: 'Sender Address', required: true, type: 'textarea' },
          { name: 'sender_through_advocate', label: 'Through Advocate (Optional)' },
        ],
      },
      {
        heading: 'Recipient Details',
        fields: [
          { name: 'recipient_name', label: 'Recipient Name', required: true },
          { name: 'recipient_address', label: 'Recipient Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Notice Details',
        fields: [
          { name: 'subject', label: 'Subject', required: true },
          { name: 'notice_date', label: 'Notice Date (DD/MM/YYYY)', required: true },
          { name: 'compliance_days', label: 'Compliance Period (Days)', type: 'number' },
          { name: 'governing_state', label: 'Governing State', required: true },
        ],
      },
    ],
    listFields: [
      { name: 'facts', label: 'Facts', placeholder: 'Add a fact', required: true },
      { name: 'legal_grounds', label: 'Legal Grounds', placeholder: 'Add a legal ground', required: true },
      { name: 'relief_sought', label: 'Relief Sought', placeholder: 'Add relief sought', required: true },
    ],
    defaults: { compliance_days: 15 },
  },

  'affidavit': {
    title: 'Affidavit Generator',
    metaTitle: 'Free Affidavit Generator for India | DoAide Legal',
    metaDescription: 'Generate a sworn affidavit for various purposes — address proof, name change, income declaration. Download as PDF or DOCX.',
    sections: [
      {
        heading: 'Deponent Details',
        fields: [
          { name: 'deponent_name', label: 'Full Name', required: true },
          { name: 'deponent_father_name', label: "Father's / Spouse's Name", required: true },
          { name: 'deponent_age', label: 'Age', type: 'number', required: true },
          { name: 'deponent_occupation', label: 'Occupation', required: true },
          { name: 'deponent_address', label: 'Address', required: true, type: 'textarea' },
        ],
      },
      {
        heading: 'Affidavit Details',
        fields: [
          { name: 'purpose', label: 'Purpose', required: true, placeholder: 'e.g., Address Proof, Name Change' },
          { name: 'place', label: 'Place', required: true },
          { name: 'date', label: 'Date (DD/MM/YYYY)', required: true },
          { name: 'notary_name', label: 'Notary Name (Optional)' },
        ],
      },
    ],
    listFields: [
      { name: 'statements', label: 'Sworn Statements', placeholder: 'Add a statement (without "That")', required: true },
    ],
    defaults: {},
  },

  'privacy-policy': {
    title: 'Privacy Policy Generator',
    metaTitle: 'Free AI Privacy Policy Generator for India — DPDP Act Compliant | DoAide Legal',
    metaDescription: 'Generate a free, AI-powered privacy policy compliant with India\'s DPDP Act 2023 and IT Act 2000. No login required. Download as PDF or DOCX.',
    aiPowered: true,
    sections: [
      {
        heading: 'Company Details',
        fields: [
          { name: 'company_name', label: 'Company / Business Name', required: true },
          { name: 'website_url', label: 'Website URL', required: true, placeholder: 'https://example.com' },
          { name: 'business_type', label: 'Business Type', type: 'select', options: ['general', 'e-commerce', 'saas', 'healthcare', 'fintech', 'education', 'media'] },
          { name: 'contact_email', label: 'Contact Email', required: true },
          { name: 'effective_date', label: 'Effective Date (DD/MM/YYYY)', required: true },
        ],
      },
      {
        heading: 'Data & Features',
        fields: [
          { name: 'uses_cookies', label: 'Uses Cookies?', type: 'select', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
          { name: 'uses_analytics', label: 'Uses Analytics?', type: 'select', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
          { name: 'uses_third_party_services', label: 'Uses Third-Party Services?', type: 'select', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
          { name: 'country', label: 'Primary Country', type: 'select', options: ['India', 'Global'] },
        ],
      },
    ],
    listFields: [
      { name: 'data_collected', label: 'Data Types Collected', placeholder: 'e.g., name, email, phone, address' },
      { name: 'third_party_services', label: 'Third-Party Services', placeholder: 'e.g., Google Analytics, Stripe, AWS' },
    ],
    defaults: { business_type: 'general', uses_cookies: 'true', uses_analytics: 'true', uses_third_party_services: 'false', country: 'India' },
    transformBeforeSubmit: (data) => ({
      ...data,
      uses_cookies: data.uses_cookies === 'true',
      uses_analytics: data.uses_analytics === 'true',
      uses_third_party_services: data.uses_third_party_services === 'true',
    }),
  },

  'terms-of-service': {
    title: 'Terms of Service Generator',
    metaTitle: 'Free AI Terms of Service Generator for India | DoAide Legal',
    metaDescription: 'Generate free, AI-powered Terms of Service for your Indian website or app. Compliant with IT Act 2000 and Consumer Protection Act 2019. Download as PDF or DOCX.',
    aiPowered: true,
    sections: [
      {
        heading: 'Company Details',
        fields: [
          { name: 'company_name', label: 'Company / Business Name', required: true },
          { name: 'website_url', label: 'Website URL', required: true, placeholder: 'https://example.com' },
          { name: 'business_type', label: 'Business Type', type: 'select', options: ['general', 'e-commerce', 'saas', 'marketplace', 'social-media', 'fintech', 'education'] },
          { name: 'services_description', label: 'Describe Your Services', type: 'textarea', required: true },
        ],
      },
      {
        heading: 'Terms Configuration',
        fields: [
          { name: 'governing_state', label: 'Governing State', required: true, placeholder: 'e.g., Maharashtra' },
          { name: 'minimum_age', label: 'Minimum User Age', type: 'number' },
          { name: 'allows_user_content', label: 'Allows User-Generated Content?', type: 'select', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
          { name: 'has_paid_services', label: 'Has Paid Services?', type: 'select', options: [{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }] },
          { name: 'refund_policy', label: 'Refund Policy', type: 'textarea', placeholder: 'Describe your refund policy (optional)' },
          { name: 'contact_email', label: 'Contact Email', required: true },
          { name: 'effective_date', label: 'Effective Date (DD/MM/YYYY)', required: true },
        ],
      },
    ],
    defaults: { business_type: 'general', minimum_age: 18, allows_user_content: 'false', has_paid_services: 'false', country: 'India' },
    transformBeforeSubmit: (data) => ({
      ...data,
      minimum_age: parseInt(data.minimum_age) || 18,
      allows_user_content: data.allows_user_content === 'true',
      has_paid_services: data.has_paid_services === 'true',
    }),
  },

  'contract-clause-library': {
    title: 'Contract Clause Library',
    metaTitle: 'Free AI Contract Clause Library for India | DoAide Legal',
    metaDescription: 'Browse and generate AI-powered contract clauses for Indian agreements. Confidentiality, indemnity, force majeure, IP assignment, and more. Free, no login.',
    aiPowered: true,
    isClauseLibrary: true,
    sections: [
      {
        heading: 'Clause Configuration',
        fields: [
          { name: 'clause_type', label: 'Clause Type', type: 'select', options: [
            { value: 'confidentiality', label: 'Confidentiality / NDA' },
            { value: 'indemnity', label: 'Indemnity' },
            { value: 'force-majeure', label: 'Force Majeure' },
            { value: 'ip-assignment', label: 'IP Assignment' },
            { value: 'non-compete', label: 'Non-Compete' },
            { value: 'non-solicitation', label: 'Non-Solicitation' },
            { value: 'termination', label: 'Termination' },
            { value: 'dispute-resolution', label: 'Dispute Resolution / Arbitration' },
            { value: 'limitation-of-liability', label: 'Limitation of Liability' },
            { value: 'data-protection', label: 'Data Protection / Privacy' },
            { value: 'payment-terms', label: 'Payment Terms' },
            { value: 'warranty', label: 'Warranty / Disclaimer' },
          ], required: true },
          { name: 'industry', label: 'Industry', type: 'select', options: ['general', 'technology', 'real-estate', 'healthcare', 'finance', 'manufacturing', 'services'] },
          { name: 'context', label: 'Context / Use Case', type: 'textarea', placeholder: 'Describe the agreement context (optional)' },
        ],
      },
      {
        heading: 'Party Details (Optional)',
        fields: [
          { name: 'party_a', label: 'Party A Name', placeholder: 'Company / Individual name' },
          { name: 'party_b', label: 'Party B Name', placeholder: 'Company / Individual name' },
          { name: 'governing_state', label: 'Governing State', placeholder: 'e.g., Maharashtra' },
        ],
      },
    ],
    defaults: { clause_type: 'confidentiality', industry: 'general' },
  },
};

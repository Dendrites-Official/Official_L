import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

type RoleKey = 'frontend' | 'backend' | 'marketing';

type RoleData = {
  title: string;
  subtitle: string;
  summary: string;
  location: string;
  type: string;
  whatYoullWorkOn: string[];
  whatWereLookingFor: string[];
  skills: string[];
  specificQuestion: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  experience: string;
  selectedSkills: string[];
  whyDendrites: string;
  proudProject: string;
  specificAnswer: string;
  resume: File | null;
  additionalDoc: File | null;
  startDate: string;
  salary: string;
  hearAbout: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const ROLE_DATA: Record<RoleKey, RoleData> = {
  frontend: {
    title: 'Front-End Developer',
    subtitle: 'Product Interfaces (Intern)',
    summary: 'Build the interfaces that power DNDX payments, SRL escrow flows, and Web3 trust infrastructure. Ship real product features in React, Next.js, and TypeScript.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'Payment interface components for DNDX escrow and receipt flows',
      'Real-time transaction status UIs with WebSocket integration',
      'Multi-chain wallet connection and signing experiences',
      'Responsive dashboard layouts for merchants and end users',
      'Pixel-perfect Tailwind implementations from Figma designs'
    ],
    whatWereLookingFor: [
      'Strong foundation in React, TypeScript, and modern CSS',
      'Experience with Next.js app router and server components',
      'Eye for detail in UI/UX implementation',
      'Comfort working with Web3 libraries (ethers.js, viem, wagmi)',
      'Ability to ship clean, maintainable code quickly'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX collaboration'],
    specificQuestion: 'Share a link to a code sample or repo that represents your best work'
  },
  backend: {
    title: 'Back-End Developer',
    subtitle: 'Payments & Data (Intern)',
    summary: 'Build the API layer and data infrastructure for DNDX payments, escrow logic, blockchain indexing, and merchant analytics. Work with Node.js, Supabase, and Postgres.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'REST APIs for payment initiation, escrow, and settlement',
      'Webhook systems for blockchain event processing',
      'Database schema design for transaction and user data',
      'Integration with Supabase Auth, Storage, and Edge Functions',
      'Background jobs for gas estimation and chain monitoring'
    ],
    whatWereLookingFor: [
      'Solid Node.js and TypeScript skills',
      'Experience with REST API design and database modeling',
      'Familiarity with Supabase, Firebase, or similar backends',
      'Understanding of async patterns and event-driven architecture',
      'Bonus: exposure to Web3 RPC calls and smart contract ABIs'
    ],
    skills: ['Node.js / Express', 'REST APIs', 'Supabase', 'Firebase', 'PostgreSQL'],
    specificQuestion: 'Share a link to a code sample or repo that represents your best work'
  },
  marketing: {
    title: 'Marketing & Community',
    subtitle: 'Growth Intern',
    summary: 'Drive user acquisition, content, and community growth for DNDX and SRL. Own landing page funnels, social campaigns, lifecycle emails, and performance marketing experiments.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'Landing page copy and conversion optimization',
      'Twitter/X content calendar and community engagement',
      'Email drip campaigns for onboarding and activation',
      'Performance marketing experiments (paid social, referrals)',
      'Analytics dashboards to track funnel metrics'
    ],
    whatWereLookingFor: [
      'Experience with growth marketing or content creation',
      'Strong copywriting and storytelling skills',
      'Familiarity with analytics tools (Google Analytics, Mixpanel)',
      'Ability to run A/B tests and interpret data',
      'Bonus: understanding of Web3/crypto user behavior'
    ],
    skills: ['Performance marketing', 'Content / social', 'Landing page funnels', 'Email / lifecycle'],
    specificQuestion: 'Share a link to a campaign, content piece, or funnel you created and why it worked'
  }
};

const HEAR_ABOUT_OPTIONS = [
  'Twitter / X',
  'LinkedIn',
  'Referral',
  'Job board',
  'Other'
];

export default function ApplyPage() {
  const { roleId } = useParams<{ roleId: string }>();
  const roleKey = (roleId as RoleKey) || 'frontend';
  const role = ROLE_DATA[roleKey];

  const [formValues, setFormValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    experience: '',
    selectedSkills: [],
    whyDendrites: '',
    proudProject: '',
    specificAnswer: '',
    resume: null,
    additionalDoc: null,
    startDate: '',
    salary: '',
    hearAbout: '',
    consent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const firstErrorRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FormValues, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormValues(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter(s => s !== skill)
        : [...prev.selectedSkills, skill]
    }));
    if (errors.selectedSkills) {
      setErrors(prev => ({ ...prev, selectedSkills: undefined }));
    }
  };

  const handleFileChange = (field: 'resume' | 'additionalDoc', file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [field]: 'File size must be under 5MB' }));
      return;
    }
    handleChange(field, file);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formValues.experience) newErrors.experience = 'Please select your experience level';
    if (formValues.selectedSkills.length === 0) newErrors.selectedSkills = 'Please select at least one skill';
    if (!formValues.whyDendrites.trim()) newErrors.whyDendrites = 'This field is required';
    if (!formValues.resume) newErrors.resume = 'Resume is required';
    if (!formValues.consent) newErrors.consent = 'You must agree to continue';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    console.log('Application submitted:', {
      role: roleKey,
      ...formValues,
      resume: formValues.resume?.name,
      additionalDoc: formValues.additionalDoc?.name
    });

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">Application Received</h1>
            <p className="text-lg text-white/70">
              Thanks, {formValues.fullName}. Your application for <span className="text-white font-medium">{role.title}</span> has been received.
            </p>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Our team will review your application and get back to you within 5-7 business days. Keep an eye on your inbox at {formValues.email}.
            </p>
            <div className="pt-8">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all shadow-lg"
              >
                ← Back to Careers
              </Link>
            </div>
          </div>
        </div>
        <Footer showCompanyInfo={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
          >
            <span>←</span>
            <span>Back to Careers</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/70">
              {role.title}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/70">
              {role.location}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-[10px] tracking-[0.18em] uppercase text-white/70">
              {role.type}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {role.title}
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl">
            {role.summary}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr,380px] gap-8 lg:gap-12">
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Section title="Basic Information">
                <Field
                  label="Full Name"
                  required
                  error={errors.fullName}
                  ref={!formValues.fullName.trim() && errors.fullName ? firstErrorRef : null}
                >
                  <input
                    type="text"
                    value={formValues.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="input-field"
                    placeholder="Alex Chen"
                  />
                </Field>

                <Field
                  label="Email"
                  required
                  error={errors.email}
                  ref={!formValues.email.trim() && errors.email ? firstErrorRef : null}
                >
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="input-field"
                    placeholder="alex@example.com"
                  />
                </Field>

                <Field label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    value={formValues.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </Field>

                <Field label="Location / Time Zone" error={errors.location}>
                  <input
                    type="text"
                    value={formValues.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="input-field"
                    placeholder="New York, EST"
                  />
                </Field>

                <Field label="Role">
                  <div className="input-field bg-slate-800/50 cursor-not-allowed">
                    {role.title}
                  </div>
                </Field>
              </Section>

              {/* Online Profiles */}
              <Section title="Online Profiles">
                <Field label="LinkedIn URL" error={errors.linkedin}>
                  <input
                    type="url"
                    value={formValues.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    className="input-field"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </Field>

                <Field label="GitHub URL" error={errors.github}>
                  <input
                    type="url"
                    value={formValues.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    className="input-field"
                    placeholder="https://github.com/yourusername"
                  />
                </Field>

                <Field label="Portfolio / Personal Website" error={errors.portfolio}>
                  <input
                    type="url"
                    value={formValues.portfolio}
                    onChange={(e) => handleChange('portfolio', e.target.value)}
                    className="input-field"
                    placeholder="https://yourwebsite.com"
                  />
                </Field>
              </Section>

              {/* Experience & Skills */}
              <Section title="Experience & Skills">
                <Field
                  label="Years of Experience"
                  required
                  error={errors.experience}
                  ref={!formValues.experience && errors.experience ? firstErrorRef : null}
                >
                  <select
                    value={formValues.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0–1 years</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </Field>

                <Field
                  label="Skills"
                  required
                  error={errors.selectedSkills}
                  ref={formValues.selectedSkills.length === 0 && errors.selectedSkills ? firstErrorRef : null}
                >
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formValues.selectedSkills.includes(skill)
                            ? 'bg-white text-black'
                            : 'bg-slate-800 text-white/70 border border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field
                  label="Why do you want to work at Dendrites?"
                  required
                  error={errors.whyDendrites}
                  ref={!formValues.whyDendrites.trim() && errors.whyDendrites ? firstErrorRef : null}
                >
                  <textarea
                    value={formValues.whyDendrites}
                    onChange={(e) => handleChange('whyDendrites', e.target.value)}
                    className="input-field min-h-[120px] resize-y"
                    placeholder="Tell us what excites you about this role and Dendrites..."
                  />
                </Field>

                <Field label="Tell us about one project you're proud of and what you personally owned" error={errors.proudProject}>
                  <textarea
                    value={formValues.proudProject}
                    onChange={(e) => handleChange('proudProject', e.target.value)}
                    className="input-field min-h-[120px] resize-y"
                    placeholder="Describe the project, your role, and the impact..."
                  />
                </Field>
              </Section>

              {/* Role-Specific Question */}
              <Section title="Role-Specific">
                <Field label={role.specificQuestion} error={errors.specificAnswer}>
                  <input
                    type="url"
                    value={formValues.specificAnswer}
                    onChange={(e) => handleChange('specificAnswer', e.target.value)}
                    className="input-field"
                    placeholder="https://..."
                  />
                </Field>
              </Section>

              {/* Documents */}
              <Section title="Documents">
                <Field
                  label="Resume / CV"
                  required
                  error={errors.resume}
                  ref={!formValues.resume && errors.resume ? firstErrorRef : null}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('resume', e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="input-field cursor-pointer flex items-center justify-between hover:border-slate-600"
                  >
                    <span className={formValues.resume ? 'text-white' : 'text-white/50'}>
                      {formValues.resume ? formValues.resume.name : 'Choose file (PDF, DOC, DOCX)'}
                    </span>
                    <span className="text-sm text-white/40">Browse</span>
                  </label>
                </Field>

                <Field label="Additional Document (Optional)" error={errors.additionalDoc}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange('additionalDoc', e.target.files?.[0] || null)}
                    className="hidden"
                    id="additional-upload"
                  />
                  <label
                    htmlFor="additional-upload"
                    className="input-field cursor-pointer flex items-center justify-between hover:border-slate-600"
                  >
                    <span className={formValues.additionalDoc ? 'text-white' : 'text-white/50'}>
                      {formValues.additionalDoc ? formValues.additionalDoc.name : 'Portfolio, case study, etc.'}
                    </span>
                    <span className="text-sm text-white/40">Browse</span>
                  </label>
                </Field>
              </Section>

              {/* Other Info */}
              <Section title="Other Information">
                <Field label="Notice Period / When Can You Start?" error={errors.startDate}>
                  <input
                    type="text"
                    value={formValues.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="input-field"
                    placeholder="Immediately / 2 weeks / 1 month"
                  />
                </Field>

                <Field label="Salary or Stipend Expectations (Optional)" error={errors.salary}>
                  <input
                    type="text"
                    value={formValues.salary}
                    onChange={(e) => handleChange('salary', e.target.value)}
                    className="input-field"
                    placeholder="$X per month or negotiable"
                  />
                </Field>

                <Field label="How Did You Hear About Dendrites?" error={errors.hearAbout}>
                  <select
                    value={formValues.hearAbout}
                    onChange={(e) => handleChange('hearAbout', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select an option</option>
                    {HEAR_ABOUT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field error={errors.consent} ref={!formValues.consent && errors.consent ? firstErrorRef : null}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formValues.consent}
                      onChange={(e) => handleChange('consent', e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-white focus:ring-2 focus:ring-slate-300"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90">
                      I agree that Dendrites can store my application data for recruiting purposes.
                    </span>
                  </label>
                </Field>
              </Section>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold text-base hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
            {/* About Dendrites */}
            <div className="p-6 rounded-xl border border-white/10 bg-slate-900/30">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">About Dendrites</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Dendrites is building a Web3 payments and trust layer with predictable gas, escrow-like flows, and real receipts. We're making crypto transactions feel like modern SaaS — no surprises, no failed txs, just reliable infrastructure.
              </p>
            </div>

            {/* What You'll Work On */}
            <div className="p-6 rounded-xl border border-white/10 bg-slate-900/30">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">What You'll Work On</h3>
              <ul className="space-y-3">
                {role.whatYoullWorkOn.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-white/70">
                    <span className="text-white/40 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We're Looking For */}
            <div className="p-6 rounded-xl border border-white/10 bg-slate-900/30">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">What We're Looking For</h3>
              <ul className="space-y-3">
                {role.whatWereLookingFor.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-white/70">
                    <span className="text-white/40 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer showCompanyInfo={false} />
    </div>
  );
}

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      {title && (
        <h2 className="text-[10px] uppercase tracking-[0.22em] text-white/50 font-medium">
          {title}
        </h2>
      )}
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

const Field = React.forwardRef<HTMLDivElement, {
  label?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}>(({ label, required, error, children }, ref) => {
  return (
    <div ref={ref} className="space-y-2">
      {label && (
        <label className="block text-sm text-white/80">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
});

Field.displayName = 'Field';

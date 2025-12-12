import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';

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
type SubmitStage = 'idle' | 'loading' | 'check';

const ROLE_DATA: Record<RoleKey, RoleData> = {
  frontend: {
    title: 'Front-End Developer',
    subtitle: 'Product Interfaces (Intern)',
    summary:
      'Build the interfaces that power DNDX payments, SRL escrow flows, and Web3 trust infrastructure. Ship real product features in React, Next.js, and TypeScript.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'Payment interface components for DNDX escrow and receipt flows',
      'Real-time transaction status UIs with WebSocket integration',
      'Multi-chain wallet connection and signing experiences',
      'Responsive dashboard layouts for merchants and end users',
      'Pixel-perfect Tailwind implementations from Figma designs',
    ],
    whatWereLookingFor: [
      'Strong foundation in React, TypeScript, and modern CSS',
      'Experience with Next.js app router and server components',
      'Eye for detail in UI/UX implementation',
      'Comfort working with Web3 libraries (ethers.js, viem, wagmi)',
      'Ability to ship clean, maintainable code quickly',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX collaboration'],
    specificQuestion: 'Share a link to a code sample or repo that represents your best work',
  },
  backend: {
    title: 'Back-End Developer',
    subtitle: 'Payments & Data (Intern)',
    summary:
      'Build the API layer and data infrastructure for DNDX payments, escrow logic, blockchain indexing, and merchant analytics. Work with Node.js, Supabase, and Postgres.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'REST APIs for payment initiation, escrow, and settlement',
      'Webhook systems for blockchain event processing',
      'Database schema design for transaction and user data',
      'Integration with Supabase Auth, Storage, and Edge Functions',
      'Background jobs for gas estimation and chain monitoring',
    ],
    whatWereLookingFor: [
      'Solid Node.js and TypeScript skills',
      'Experience with REST API design and database modeling',
      'Familiarity with Supabase, Firebase, or similar backends',
      'Understanding of async patterns and event-driven architecture',
      'Bonus: exposure to Web3 RPC calls and smart contract ABIs',
    ],
    skills: ['Node.js / Express', 'REST APIs', 'Supabase', 'Firebase', 'PostgreSQL'],
    specificQuestion: 'Share a link to a code sample or repo that represents your best work',
  },
  marketing: {
    title: 'Marketing & Community',
    subtitle: 'Growth Intern',
    summary:
      'Drive user acquisition, content, and community growth for DNDX and SRL. Own landing page funnels, social campaigns, lifecycle emails, and performance marketing experiments.',
    location: 'Remote Worldwide',
    type: 'Paid Internship',
    whatYoullWorkOn: [
      'Landing page copy and conversion optimization',
      'Twitter/X content calendar and community engagement',
      'Email drip campaigns for onboarding and activation',
      'Performance marketing experiments (paid social, referrals)',
      'Analytics dashboards to track funnel metrics',
    ],
    whatWereLookingFor: [
      'Experience with growth marketing or content creation',
      'Strong copywriting and storytelling skills',
      'Familiarity with analytics tools (Google Analytics, Mixpanel)',
      'Ability to run A/B tests and interpret data',
      'Bonus: understanding of Web3/crypto user behavior',
    ],
    skills: [
      'Performance marketing',
      'Content / social',
      'Landing page funnels',
      'Email / lifecycle',
    ],
    specificQuestion:
      'Share a link to a campaign, content piece, or funnel you created and why it worked',
  },
};

const HEAR_ABOUT_OPTIONS = [
  'Twitter / X',
  'LinkedIn',
  'Referral',
  'Job board',
  'Other',
];

export default function InternshipApplyPage() {
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
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<SubmitStage>('idle');
  const firstErrorRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FormValues, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormValues((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
    if (errors.selectedSkills) {
      setErrors((prev) => ({ ...prev, selectedSkills: undefined }));
    }
  };

  const handleFileChange = (field: 'resume' | 'additionalDoc', file: File | null) => {
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [field]: 'File size must be under 5MB' }));
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
    if (formValues.selectedSkills.length === 0)
      newErrors.selectedSkills = 'Please select at least one skill';
    if (!formValues.whyDendrites.trim())
      newErrors.whyDendrites = 'This field is required';
    if (!formValues.resume) newErrors.resume = 'Resume is required';
    if (!formValues.consent) newErrors.consent = 'You must agree to continue';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        firstErrorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStage('loading');
    setSubmitted(false);

    try {
      const emailContent = {
        to: 'hello@dendrites.ai',
        subject: `Job Application: ${role.title} - ${formValues.fullName}`,
        role: role.title,
        fullName: formValues.fullName,
        email: formValues.email,
        phone: formValues.phone,
        location: formValues.location,
        linkedin: formValues.linkedin,
        github: formValues.github,
        portfolio: formValues.portfolio,
        experience: formValues.experience,
        skills: formValues.selectedSkills.join(', '),
        whyDendrites: formValues.whyDendrites,
        proudProject: formValues.proudProject,
        specificAnswer: formValues.specificAnswer,
        startDate: formValues.startDate,
        salary: formValues.salary,
        hearAbout: formValues.hearAbout,
        resume: formValues.resume?.name || 'Not provided',
        additionalDoc: formValues.additionalDoc?.name || 'Not provided',
      };

      // TODO: replace with your Formspree form ID
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      // loader → check → modal
      setTimeout(() => {
        setSubmitStage('check');
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitStage('idle');
          setSubmitted(true);
        }, 800);
      }, 1000);
    }
  };

  const SubmittingOverlay = ({ stage }: { stage: SubmitStage }) => {
    if (stage === 'idle') return null;

    return (
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            {stage === 'loading' && (
              <>
                <div className="absolute inset-0 rounded-full border border-white/25" />
                <div className="absolute inset-1 rounded-full border-4 border-t-white border-r-white/70 border-b-white/20 border-l-white/10 animate-spin" />
              </>
            )}
            {stage === 'check' && (
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
          <p className="text-sm text-white/80">
            {stage === 'loading'
              ? 'Submitting your application…'
              : 'Application submitted'}
          </p>
        </div>
      </div>
    );
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black animate-fadeIn">
      <div className="relative w-full max-w-md px-4 animate-scaleIn">
        {/* soft green glow */}
        <div className="absolute inset-0 bg-green-500/10 rounded-2xl blur-xl pointer-events-none" />

        {/* card */}
        <div className="relative bg-black border-2 border-green-500 rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent" />

          <div className="p-6 sm:p-8">
            {/* icon */}
            <div className="relative mx-auto mb-6 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping-slow" />
              <div className="absolute inset-0 rounded-full bg-green-500/5 border-2 border-green-500/30" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg
                  className="w-8 h-8 text-white animate-checkmark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* text */}
            <div className="text-center space-y-4 mb-6 select-none">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Successfully Sent!
                </h2>
                <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent" />
              </div>

              <p className="text-sm text-white/90 leading-relaxed">
                Thank you,{' '}
                <span className="font-semibold text-green-400">
                  {formValues.fullName}
                </span>
                . Your application for{' '}
                <span className="font-semibold text-white">{role.title}</span>{' '}
                has been sent.
              </p>

              <div className="bg-black border border-green-500/20 rounded-xl p-3">
                <p className="text-xs text-white/70">
                  We'll respond within{' '}
                  <span className="text-green-400 font-semibold">
                    5–7 days
                  </span>{' '}
                  at:
                </p>
                <p className="text-white font-semibold mt-1 text-sm">
                  {formValues.email}
                </p>
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-col gap-2">
              <Link
                to="/careers"
                className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-all text-center shadow-lg shadow-green-500/20 hover:shadow-green-500/30 cursor-pointer"
                onClick={() => setSubmitted(false)}
              >
                Back to Careers
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full px-6 py-3 bg-black text-white border border-green-500/50 rounded-xl font-medium text-sm hover:bg-green-500/10 hover:border-green-500 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* loader overlay */}
      {isSubmitting && submitStage !== 'idle' && (
        <SubmittingOverlay stage={submitStage} />
      )}

      {/* success modal */}
      {submitted && <SuccessModal />}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* header */}
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

        {/* grid */}
        <div className="grid lg:grid-cols-[1fr,380px] gap-8 lg:gap-12">
          {/* form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Section title="Basic Information">
                <Field
                  label="Full Name"
                  required
                  error={errors.fullName}
                  ref={
                    !formValues.fullName.trim() && errors.fullName
                      ? firstErrorRef
                      : null
                  }
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
                  ref={
                    !formValues.email.trim() && errors.email
                      ? firstErrorRef
                      : null
                  }
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
                  <div className="input-field bg-white/5 cursor-not-allowed opacity-60">
                    {role.title}
                  </div>
                </Field>
              </Section>

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

                <Field
                  label="Portfolio / Personal Website"
                  error={errors.portfolio}
                >
                  <input
                    type="url"
                    value={formValues.portfolio}
                    onChange={(e) => handleChange('portfolio', e.target.value)}
                    className="input-field"
                    placeholder="https://yourwebsite.com"
                  />
                </Field>
              </Section>

              <Section title="Experience & Skills">
                <Field
                  label="Years of Experience"
                  required
                  error={errors.experience}
                  ref={
                    !formValues.experience && errors.experience
                      ? firstErrorRef
                      : null
                  }
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
                  ref={
                    formValues.selectedSkills.length === 0 &&
                    errors.selectedSkills
                      ? firstErrorRef
                      : null
                  }
                >
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          formValues.selectedSkills.includes(skill)
                            ? 'bg-white text-black'
                            : 'bg-transparent text-white/70 border border-white/20 hover:border-white/40 hover:bg-white/5'
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
                  ref={
                    !formValues.whyDendrites.trim() && errors.whyDendrites
                      ? firstErrorRef
                      : null
                  }
                >
                  <textarea
                    value={formValues.whyDendrites}
                    onChange={(e) => handleChange('whyDendrites', e.target.value)}
                    className="input-field min-h-[120px] resize-y"
                    placeholder="Tell us what excites you about this role and Dendrites..."
                  />
                </Field>

                <Field
                  label="Tell us about one project you're proud of and what you personally owned"
                  error={errors.proudProject}
                >
                  <textarea
                    value={formValues.proudProject}
                    onChange={(e) => handleChange('proudProject', e.target.value)}
                    className="input-field min-h-[120px] resize-y"
                    placeholder="Describe the project, your role, and the impact..."
                  />
                </Field>
              </Section>

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
                    onChange={(e) =>
                      handleFileChange('resume', e.target.files?.[0] || null)
                    }
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="input-field cursor-pointer flex items-center justify-between hover:border-white/40 hover:bg-white/5"
                  >
                    <span
                      className={
                        formValues.resume ? 'text-white' : 'text-white/50'
                      }
                    >
                      {formValues.resume
                        ? formValues.resume.name
                        : 'Choose file (PDF, DOC, DOCX)'}
                    </span>
                    <span className="text-sm text-white/40">Browse</span>
                  </label>
                </Field>

                <Field
                  label="Additional Document (Optional)"
                  error={errors.additionalDoc}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      handleFileChange(
                        'additionalDoc',
                        e.target.files?.[0] || null,
                      )
                    }
                    className="hidden"
                    id="additional-upload"
                  />
                  <label
                    htmlFor="additional-upload"
                    className="input-field cursor-pointer flex items-center justify-between hover:border-white/40 hover:bg-white/5"
                  >
                    <span
                      className={
                        formValues.additionalDoc
                          ? 'text-white'
                          : 'text-white/50'
                      }
                    >
                      {formValues.additionalDoc
                        ? formValues.additionalDoc.name
                        : 'Portfolio, case study, etc.'}
                    </span>
                    <span className="text-sm text-white/40">Browse</span>
                  </label>
                </Field>
              </Section>

              <Section title="Other Information">
                <Field
                  label="Notice Period / When Can You Start?"
                  error={errors.startDate}
                >
                  <input
                    type="text"
                    value={formValues.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="input-field"
                    placeholder="Immediately / 2 weeks / 1 month"
                  />
                </Field>

                <Field
                  label="Salary or Stipend Expectations (Optional)"
                  error={errors.salary}
                >
                  <input
                    type="text"
                    value={formValues.salary}
                    onChange={(e) => handleChange('salary', e.target.value)}
                    className="input-field"
                    placeholder="$X per month or negotiable"
                  />
                </Field>

                <Field
                  label="How Did You Hear About Dendrites?"
                  error={errors.hearAbout}
                >
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

                <Field
                  error={errors.consent}
                  ref={!formValues.consent && errors.consent ? firstErrorRef : null}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const newValue = !formValues.consent;
                        setFormValues((prev) => ({ ...prev, consent: newValue }));
                        if (errors.consent) {
                          setErrors((prev) => ({ ...prev, consent: undefined }));
                        }
                      }}
                      className={`relative flex items-center justify-center w-5 h-5 flex-shrink-0 rounded-md border-2 transition-all cursor-pointer ${
                        formValues.consent
                          ? 'bg-white border-white'
                          : errors.consent
                          ? 'border-red-500 bg-transparent'
                          : 'border-white/20 bg-transparent hover:border-white/40'
                      }`}
                    >
                      {formValues.consent && (
                        <svg
                          className="w-3.5 h-3.5 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <label
                      onClick={() => {
                        const newValue = !formValues.consent;
                        setFormValues((prev) => ({ ...prev, consent: newValue }));
                        if (errors.consent) {
                          setErrors((prev) => ({ ...prev, consent: undefined }));
                        }
                      }}
                      className="text-sm text-white/70 hover:text-white/90 transition-colors cursor-pointer"
                    >
                      I agree that Dendrites can store my application data for
                      recruiting purposes.
                    </label>
                  </div>
                </Field>
              </Section>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-10 py-4 rounded-xl font-semibold text-base transition-all shadow-xl ${
                    isSubmitting
                      ? 'bg-white/70 text-black/80 cursor-default'
                      : 'bg-white text-black hover:bg-white/90 hover:scale-[1.02] hover:shadow-2xl'
                  }`}
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>

          {/* sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-8">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                About Dendrites
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Dendrites is building a Web3 payments and trust layer with
                predictable gas, escrow-like flows, and real receipts. We're
                making crypto transactions feel like modern SaaS — no surprises,
                no failed txs, just reliable infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                What You'll Work On
              </h3>
              <ul className="space-y-3">
                {role.whatYoullWorkOn.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-white/70">
                    <span className="text-white/40 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
                What We're Looking For
              </h3>
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

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.875rem 1.125rem;
          background-color: transparent;
          border: 1.5px solid rgb(255 255 255 / 0.15);
          border-radius: 0.75rem;
          color: white;
          font-size: 0.9375rem;
          transition: all 0.25s ease;
          font-weight: 400;
        }
        .input-field:focus {
          outline: none;
          border-color: rgb(255 255 255 / 0.4);
          background-color: rgb(255 255 255 / 0.02);
          box-shadow: 0 0 0 3px rgb(255 255 255 / 0.05);
        }
        .input-field:hover:not(:disabled) {
          border-color: rgb(255 255 255 / 0.25);
          background-color: rgb(255 255 255 / 0.01);
        }
        .input-field::placeholder {
          color: rgb(255 255 255 / 0.35);
        }
        .input-field-error {
          border-color: rgb(239 68 68) !important;
          background-color: rgb(239 68 68 / 0.05) !important;
        }
        .input-field-error:focus {
          border-color: rgb(239 68 68) !important;
          box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1) !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
        }
        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: 100, 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark 0.6s ease-out 0.2s forwards;
        }
      `}</style>
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
      <div className="space-y-5">{children}</div>
    </div>
  );
}

const Field = React.forwardRef<
  HTMLDivElement,
  {
    label?: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
  }
>(({ label, required, error, children }, ref) => {
  const childrenWithError = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childType = (child as any).type;
      const currentClassName = child.props.className || '';

      if (
        childType === 'input' ||
        childType === 'textarea' ||
        childType === 'select'
      ) {
        const errorClass = error ? 'input-field-error' : '';
        const newClassName = `${currentClassName} ${errorClass}`.trim();
        return React.cloneElement(child, {
          className: newClassName,
        } as any);
      }
    }
    return child;
  });

  return (
    <div ref={ref} className="space-y-2">
      {label && (
        <label className="block text-sm text-white/80">
          {label}
          {required && <span className="text-white ml-1">*</span>}
        </label>
      )}
      {childrenWithError}
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
});

Field.displayName = 'Field';

import { PageHeader } from '../../components/ui/PageHeader'

const Analytics = () => (
  <div className="space-y-6">
    <PageHeader
      eyebrow="MoodSense AI"
      title="Analytics"
      description="Scalable placeholder page ready for feature-specific components, data services, and responsive content sections."
    />
    <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/30">
      <p className="text-slate-300">Build the Analytics experience here while keeping page logic isolated from shared components and services.</p>
    </section>
  </div>
)

export default Analytics

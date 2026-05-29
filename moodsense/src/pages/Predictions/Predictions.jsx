import { AIExplanationCard } from '../../components/predictions/AIExplanationCard'
import { BehavioralForecastCard } from '../../components/predictions/BehavioralForecastCard'
import { ConfidenceMeterCard } from '../../components/predictions/ConfidenceMeterCard'
import { ForecastLineCard } from '../../components/predictions/ForecastLineCard'
import { ImproveTomorrowCard } from '../../components/predictions/ImproveTomorrowCard'
import { TomorrowMoodCard } from '../../components/predictions/TomorrowMoodCard'
import { TomorrowStressCard } from '../../components/predictions/TomorrowStressCard'
import { moodForecast, stressForecast } from '../../data/predictionsData'

const Predictions = () => (
  <div className="mx-auto max-w-7xl space-y-6 pb-6">
    <header>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Future behavioral intelligence</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Predictions</h1>
      <p className="mt-2 max-w-2xl text-slate-400">Forecast mood, stress, sleep, activity, and screen usage with dummy AI prediction data.</p>
    </header>

    <section className="grid gap-5 lg:grid-cols-2">
      <TomorrowMoodCard />
      <TomorrowStressCard />
    </section>

    <section className="grid gap-5 xl:grid-cols-2">
      <ForecastLineCard color="#a855f7" data={moodForecast} title="Next 7 Days Mood Forecast" />
      <ForecastLineCard color="#22d3ee" data={stressForecast} title="Next 7 Days Stress Forecast" />
    </section>

    <BehavioralForecastCard />

    <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <AIExplanationCard />
      <ConfidenceMeterCard />
    </section>

    <ImproveTomorrowCard />
  </div>
)

export default Predictions

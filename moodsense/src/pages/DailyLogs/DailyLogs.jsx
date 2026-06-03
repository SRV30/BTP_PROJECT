import { useState, useEffect, useCallback } from 'react'
import { appApi } from '../../services/appApi'
import { PageState } from '../../components/ui/PageState'
import { Button } from '../../components/ui/Button'

const SLOTS = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT']

const DailyLogs = () => {
  const [logs, setLogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLog, setEditingLog] = useState(null)
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0])

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    slot: 'MORNING',
    sleep: 0,
    steps: 0,
    screenTime: 0,
    instagramUsage: 0,
    whatsappUsage: 0,
    linkedinUsage: 0,
    gmailUsage: 0,
    unacademyUsage: 0,
    notes: '',
  })

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await appApi.getLogsByDate(filterDate)
      setLogs(data)
      setError(null)
    } catch {
      setError('Failed to fetch logs')
    } finally {
      setIsLoading(false)
    }
  }, [filterDate])

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      if (isMounted) await fetchLogs()
    }
    load()
    return () => { isMounted = false }
  }, [fetchLogs])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'notes' || name === 'slot' || name === 'date' ? value : Number(value),
    }))
  }

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      slot: 'MORNING',
      sleep: 0,
      steps: 0,
      screenTime: 0,
      instagramUsage: 0,
      whatsappUsage: 0,
      linkedinUsage: 0,
      gmailUsage: 0,
      unacademyUsage: 0,
      notes: '',
    })
    setEditingLog(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingLog) {
        await appApi.updateLog(editingLog._id, formData)
      } else {
        await appApi.createLog(formData)
      }
      setIsModalOpen(false)
      resetForm()
      fetchLogs()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save log')
    }
  }

  const handleEdit = (log) => {
    setEditingLog(log)
    setFormData({
      date: new Date(log.date).toISOString().split('T')[0],
      slot: log.slot,
      sleep: log.sleep,
      steps: log.steps,
      screenTime: log.screenTime,
      instagramUsage: log.instagramUsage,
      whatsappUsage: log.whatsappUsage,
      linkedinUsage: log.linkedinUsage,
      gmailUsage: log.gmailUsage,
      unacademyUsage: log.unacademyUsage,
      notes: log.notes || '',
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return
    try {
      await appApi.deleteLog(id)
      fetchLogs()
    } catch {
      alert('Failed to delete log')
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Daily Logs</h1>
          <p className="mt-2 text-slate-400">Track your habits and routines throughout the day.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            onChange={(e) => setFilterDate(e.target.value)}
            type="date"
            value={filterDate}
          />
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
            + Add Log
          </Button>
        </div>
      </header>

      <PageState error={error} isLoading={isLoading} />

      {!isLoading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SLOTS.map((slot) => {
            const log = logs.find((l) => l.slot === slot)
            return (
              <div
                className={`relative overflow-hidden rounded-3xl border p-6 transition ${
                  log ? 'border-violet-500/30 bg-slate-900/50' : 'border-white/5 bg-slate-950/40'
                }`}
                key={slot}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{slot}</h3>
                  {log && (
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-violet-400" onClick={() => handleEdit(log)}>✎</button>
                      <button className="text-slate-400 hover:text-rose-400" onClick={() => handleDelete(log._id)}>✕</button>
                    </div>
                  )}
                </div>

                {log ? (
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p><span className="text-slate-500">Sleep:</span> {log.sleep}h</p>
                    <p><span className="text-slate-500">Steps:</span> {log.steps}</p>
                    <p><span className="text-slate-500">Screen:</span> {log.screenTime}h</p>
                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs opacity-70">
                      <p>IG: {log.instagramUsage}m</p>
                      <p>WA: {log.whatsappUsage}m</p>
                      <p>LI: {log.linkedinUsage}m</p>
                      <p>GM: {log.gmailUsage}m</p>
                      <p>UN: {log.unacademyUsage}m</p>
                    </div>
                    {log.notes && (
                      <p className="mt-3 border-t border-white/5 pt-2 italic text-slate-400 line-clamp-2">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-slate-600">No entries for this slot</p>
                    <button
                      className="mt-2 text-xs font-bold text-violet-400 hover:underline"
                      onClick={() => { resetForm(); setFormData(p => ({...p, slot})); setIsModalOpen(true); }}
                    >
                      Log Now
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black text-white">{editingLog ? 'Edit Log' : 'New Daily Log'}</h2>
              <button className="text-slate-400 hover:text-white" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                    name="date"
                    onChange={handleInputChange}
                    type="date"
                    value={formData.date}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Slot</label>
                  <select
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                    name="slot"
                    onChange={handleInputChange}
                    value={formData.slot}
                  >
                    {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sleep (h)</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                    name="sleep"
                    onChange={handleInputChange}
                    step="0.5"
                    type="number"
                    value={formData.sleep}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Steps</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                    name="steps"
                    onChange={handleInputChange}
                    type="number"
                    value={formData.steps}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Screen (h)</label>
                  <input
                    className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                    name="screenTime"
                    onChange={handleInputChange}
                    step="0.1"
                    type="number"
                    value={formData.screenTime}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-violet-400">App Usage (minutes)</p>
                <div className="grid grid-cols-3 gap-4 lg:grid-cols-5">
                  {[
                    { label: 'Insta', name: 'instagramUsage' },
                    { label: 'WA', name: 'whatsappUsage' },
                    { label: 'LI', name: 'linkedinUsage' },
                    { label: 'GM', name: 'gmailUsage' },
                    { label: 'UN', name: 'unacademyUsage' },
                  ].map((field) => (
                    <div className="space-y-1" key={field.name}>
                      <label className="text-[10px] font-bold text-slate-500">{field.label}</label>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-slate-800 px-2 py-2 text-sm text-white outline-none focus:border-violet-500"
                        name={field.name}
                        onChange={handleInputChange}
                        type="number"
                        value={formData[field.name]}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Notes</label>
                <textarea
                  className="h-24 w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2 text-white outline-none focus:border-violet-500"
                  name="notes"
                  onChange={handleInputChange}
                  placeholder="How was your day? Any specific triggers or wins?"
                  value={formData.notes}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" type="submit">
                  {editingLog ? 'Update Entry' : 'Save Entry'}
                </Button>
                <Button className="bg-slate-700 hover:bg-slate-600" onClick={() => setIsModalOpen(false)} type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyLogs

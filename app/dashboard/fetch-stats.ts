export async function fetchRealStats() {
  try {
    const res = await fetch('https://frankie-prod.life.conway.tech/stats', {
      cache: 'no-store'
    });
    const data = await res.json();
    return {
      calls: data.calls || 0,
      revenue: data.earnings || 0,
      payments: data.realPayments || 0
    };
  } catch {
    return { calls: 0, revenue: 0, payments: 0 };
  }
}

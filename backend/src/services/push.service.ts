// Ekhon console e dekhabe. Firebase key pele pore asol push jukto hobe.
export async function sendPush(
  deviceToken: string,
  title: string,
  body: string,
  data?: Record<string, string>
) {
  console.log(`[PUSH → ${deviceToken}] ${title}: ${body}`, data ?? '');
}
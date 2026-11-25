import { createPicker } from "./picker.ts";
import type { Tier } from "./scoring.ts";

const GIPHY = "https://media.giphy.com/media";

export const GIFS: Record<Tier, string[]> = {
  low: [
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExYTNtbjVsc2d5YmVibHgzeHJuajM2eXI3c3JjMTNveGlmaTVjd2t5YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DpPUDW4XTw4EM/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExOGh4NDQzdG82OTdtM3NpdzQ1dHQ0N2g0Nmh5ODQ0MDd5cWk2Yzg4aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2JI8IxBaZhxZ7GcU/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExZXg5ZG9oNXRvdDF5dDMxdXhjdXBzbmowZ2Y3b2J5dHAzZDBtdWh2ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EXHHMS9caoxAA/giphy.gif`,
    `${GIPHY}/v1.Y2lkPWVjZjA1ZTQ3Z2N5ZzE0MWdpZmthM3J2eGJleWV6aHNnNDZkZ2VjOW9wY3JkbW56diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2t9mb0HwTVn3mHj8AZ/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExdzBrNzBobHkxNnN5bWt5dGVlbzhqMThhMWY5Z2x5aml0c2l4ZmhpbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JGBpEusZvXoCYHpH5k/giphy.gif`,
  ],
  mid: [
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExdmptNnp5aGlpM3M3ZHQ5M3hrZHU4am9pa3hhZ2ttcG92cXA1MmJuYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HnvHPDMPdQQlOTMwlQ/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExYTBhc2pqdTkxdHdtMWc3NWdtN2NldXl6MnZxMTZ6dzZhbjZteGQ0bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qLWdMYX1NYF2g/giphy.gif`,
    `${GIPHY}/v1.Y2lkPWVjZjA1ZTQ3Y3B0cGl3cmFjdXpmcm56NnBrbGh6dWhvamlhaXJ0ZXQ0M3JobnN2MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6woMELTKLMu1WZC18M/giphy.gif`,
  ],
  high: [
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExMGh5MndzaHM1YzV2MDY5cDJyazh0ZTFqNDlma3RrMGZ1cWNhaTl5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XIqCQx02E1U9W/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExMGh5MndzaHM1YzV2MDY5cDJyazh0ZTFqNDlma3RrMGZ1cWNhaTl5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13GIgrGdslD9oQ/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExbnF3dGl5Z29maGxwY3g2dHc3cGJ5OWc3eXA5Z3dxZGowOHdxcmgyayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/V0IdVIIW1y5d6/giphy.gif`,
    `${GIPHY}/v1.Y2lkPTc5MGI3NjExb2E3amhkdDQ1YmFjZmdubjdhdjYzNDk4dzV1cHJkZW1xOTlhenc2ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/diUKszNTUghVe/giphy.gif`,
  ],
};

export const pickGif = createPicker(GIFS);

import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import path from 'path';

const credentialsPath = path.resolve(process.cwd(), 'gcloud-credentials.json');
const ttsClient = new TextToSpeechClient({ keyFilename: credentialsPath });

export async function POST(request: Request) {
  try {
    // Receive the new 'gender' parameter from the frontend
    const { text, languageCode, gender } = await request.json();

    if (!text || !languageCode) {
      return NextResponse.json({ error: 'Missing "text" or "languageCode"' }, { status: 400 });
    }

    // Validate the received gender to ensure it's a valid value
    const validGenders = ['NEUTRAL', 'MALE', 'FEMALE'];
    const ssmlGender = validGenders.includes(gender) ? gender : 'NEUTRAL';

    const ttsRequest = {
      input: { text: text },
      voice: { 
        languageCode: languageCode, 
        // Use the selected gender in the request to Google
        ssmlGender: ssmlGender as 'NEUTRAL' | 'MALE' | 'FEMALE' 
      },
      audioConfig: { audioEncoding: 'MP3' as const },
    };

    const [response] = await ttsClient.synthesizeSpeech(ttsRequest);
    const audioContent = (response.audioContent as Buffer).toString('base64');
    return NextResponse.json({ audioContent });

  } catch (error: any) {
    console.error('Google TTS API Error:', error);
    return NextResponse.json({ error: `Failed to synthesize speech: ${error.message}` }, { status: 500 });
  }
}
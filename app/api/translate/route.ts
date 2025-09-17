import { NextResponse } from 'next/server';
import { TranslationServiceClient } from '@google-cloud/translate';
import path from 'path';

const credentialsPath = path.resolve(process.cwd(), 'gcloud-credentials.json');
const projectId = process.env.GOOGLE_PROJECT_ID || '';

const translationClient = new TranslationServiceClient({
  keyFilename: credentialsPath,
  projectId: projectId,
});

export async function POST(request: Request) {
  try {
    const { text, targetLanguage } = await request.json();
    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Missing "text" or "targetLanguage"' }, { status: 400 });
    }

    const googleRequest = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: 'en',
      targetLanguageCode: targetLanguage,
    };

    const [response] = await translationClient.translateText(googleRequest);
    const translatedText = response.translations?.[0]?.translatedText || '';
    return NextResponse.json({ translatedText });

  } catch (error: any) {
    console.error('Google Translate API Error:', error);
    return NextResponse.json({ error: `Failed to translate text: ${error.message}` }, { status: 500 });
  }
}
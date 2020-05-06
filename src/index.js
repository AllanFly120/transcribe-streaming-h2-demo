const { 
    TranscribeStreamingClient, 
    StartStreamTranscriptionCommand
} = require("../../aws-sdk-js-v3/clients/client-transcribe-streaming");
const fs = require('fs');

(async () => {
    console.log(`***start: [${new Date()}]`);
    const audioSource = fs.createReadStream('./out.wav');
    const audioStream = async function* () {
        for await(const chunk of audioSource) {
            yield {AudioEvent: {AudioChunk: chunk}}
        }
    }
    const client = new TranscribeStreamingClient({credentials: {
        accessKeyId: 'key',
        secretAccessKey: 'secret'
    }});

    const command = new StartStreamTranscriptionCommand({
        LanguageCode: 'en-US',
        MediaSampleRateHertz: 44100,
        MediaEncoding: 'pcm',
        AudioStream: audioStream()
    });
    try {
        const data = await client.send(command);
        console.log('Response data: ', data);
        for await (const event of data.TranscriptResultStream) {
            if(event.TranscriptEvent) {
                const results = event.TranscriptEvent.Transcript.Results;
                results.map(result => {
                    (result.Alternatives || []).map(alternative => {
                        const str = alternative.Items.map(item => item.Content).join(' ');
                        console.log(str);
                    })
                })
            }
        }
    } catch(e) {
        console.log('ERROR: ', e);
    } finally {
        audioSource.close();
        audioSource.destroy();
        client.destroy();
    }
})()

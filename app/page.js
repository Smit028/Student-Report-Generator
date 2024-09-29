import OMRScanner from './components/OMRScanner';
import UploadAnswerKey from './components/upload-answerkey';

export default function Home() {
  return (
    <div>
      <header>
    <UploadAnswerKey/>
      </header>
      <OMRScanner />
    </div>
  );
}

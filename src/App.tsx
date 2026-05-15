import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Badge } from './components/Badge/Badge';

export function App() {
  return (
    <main className="app">
      <h1>Sample Components</h1>
      <p className="app__lead">
        Storybook で各コンポーネントを確認するには <code>npm run storybook</code> を実行してください。
      </p>

      <section className="app__section">
        <h2>Button</h2>
        <div className="app__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section className="app__section">
        <h2>Input</h2>
        <Input label="メールアドレス" placeholder="you@example.com" />
      </section>

      <section className="app__section">
        <h2>Card + Badge</h2>
        <Card title="お知らせ" footer={<Button variant="primary">詳細を見る</Button>}>
          <p>新機能 <Badge tone="info">NEW</Badge> がリリースされました。</p>
        </Card>
      </section>
    </main>
  );
}

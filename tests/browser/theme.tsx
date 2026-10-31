import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { parseDate } from '@internationalized/date';
import { Search } from 'lucide-react';
import { Button, Card, DatePicker, FloorPlan, Grid, LocaleProvider, TextField, ThemeProvider, ToggleButton } from '../../src';
import '../../src/styles/index.css';
import '../../src/styles/fonts.css';
const params = new URLSearchParams(location.search);
const outer = params.get('outer') === 'dark' ? 'dark' : 'light';
const inner = outer === 'dark' ? 'light' : 'dark';
document.documentElement.classList.add('fixture-unrelated-before');
document.documentElement.dataset.plumbTheme = 'preexisting';
document.documentElement.style.colorScheme = 'normal';
const root = createRoot(document.getElementById('root')!);
declare global { interface Window { themeFixture: { hideInner: () => void; unmount: () => void } } }
function Fixture() {
  const [nested, setNested] = useState(params.has('nested'));
  useEffect(() => { window.themeFixture = { hideInner: () => setNested(false), unmount: () => root.unmount() }; }, []);
  return <LocaleProvider locale="en-CA"><ThemeProvider theme={outer}>
    <output data-testid="outer">{outer}</output>
    <Grid layout="sidebar" data-testid="responsive-grid">
      <div>Navigation fixture</div>
      <Card><TextField label="Company name" /><Button variant="primary" icon={<Search />}>Save fixture</Button></Card>
      <ToggleButton data-testid="toggle-default">Pin fixture</ToggleButton>
      <FloorPlan aria-label="Fixture plan" rooms={[{ id: 'kitchen', name: 'Kitchen', polygon: [[0, 0], [4, 0], [4, 4], [0, 4]], area: 16 }]} pins={[{ id: 'dishwasher', roomId: 'kitchen', label: 'Dishwasher', at: [1, 1] }]} onPinAction={() => {}} />
    </Grid>
    {nested && <ThemeProvider theme={inner}><div data-testid="inner"><DatePicker label="Nested site visit" defaultValue={parseDate('2026-11-12')} /></div></ThemeProvider>}
  </ThemeProvider></LocaleProvider>;
}
root.render(<Fixture />);

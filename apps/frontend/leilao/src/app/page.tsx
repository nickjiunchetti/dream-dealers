import { UiComponents } from '@dream-dealers/ui-components';
import { uiTools } from '@dream-dealers/ui-tools';

export default async function Index() {
  return (
    <div className="bg-red">
      Hello!
      <UiComponents />
      {uiTools()}
    </div>
  );
}

import { StatusBar } from './StatusBar';
import { Sidebar } from './Sidebar';
import { DetailsPanel } from './DetailsPanel';
import { BottomBar } from './BottomBar';
import { Modals } from './Modals';

export function getLayoutHTML(): string {
  return `
  <!-- Main Window -->
  <div class="window">
    ${StatusBar()}
    <!-- Main Content -->
    <div class="main-content">
      ${Sidebar()}
      ${DetailsPanel()}
    </div>
    ${BottomBar()}
  </div>
  ${Modals()}
  `;
}

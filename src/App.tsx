import { Text } from '@radix-ui/themes'
import ApplicationHeader from './layout/ApplicationHeader'
import './App.css';
import ApplicationBody from './layout/ApplicationBody';
import Navigation from './navigation/Navigation';
import NavigationItem from './navigation/NavitagationItem';
import Missions from './completed_missions/Missions';
import CurrentMission from './current_mission/CurrentMission';

function App() {
  return (
 		<ApplicationBody>
      <ApplicationHeader />
      <Navigation currentValue='currentmission' completedValue='missions' reportsValue='reports'>
        <NavigationItem value="currentmission">
          <CurrentMission />
        </NavigationItem>
        <NavigationItem value="missions">
          <Missions />
        </NavigationItem>
        <NavigationItem value="reports">
          <Text>Reports are coming soon</Text>
        </NavigationItem>
      </Navigation>
		</ApplicationBody>
  )
}

export default App

import { Text } from '@radix-ui/themes'
import ApplicationHeader from './layout/ApplicationHeader'
import './App.css';
import ApplicationBody from './layout/ApplicationBody';
import Navigation from './navigation/Navigation';
import NavigationItem from './navigation/NavitagationItem';
import CompletedMissions from './completed_missions/CompletedMissions';
import CurrentMission from './current_mission/CurrentMission';

function App() {
  return (
 		<ApplicationBody>
      <ApplicationHeader />
      <Navigation currentValue='currentmission' completedValue='completedmissions' reportsValue='reports'>
        <NavigationItem value="currentmission">
          <CurrentMission />
        </NavigationItem>
        <NavigationItem value="completedmissions">
          <CompletedMissions />
        </NavigationItem>
        <NavigationItem value="reports">
          <Text>Reports are coming soon</Text>
        </NavigationItem>
      </Navigation>
		</ApplicationBody>
  )
}

export default App

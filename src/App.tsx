import ApplicationHeader from './layout/ApplicationHeader'
import './App.css';
import ApplicationBody from './layout/ApplicationBody';
import Navigation from './navigation/Navigation';
import NavigationItem from './navigation/NavitagationItem';
import Missions from './completed_missions/Missions';
import CurrentMission from './current_mission/CurrentMission';
import ReportsPage from './reports/ReportsPage';

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
          <ReportsPage />
        </NavigationItem>
      </Navigation>
		</ApplicationBody>
  )
}

export default App

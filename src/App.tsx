import { Text } from '@radix-ui/themes'
import ApplicationHeader from './layout/ApplicationHeader'
import './App.css';
import ApplicationBody from './layout/ApplicationBody';
import Navigation from './navigation/Navigation';
import NavigationItem from './navigation/NavitagationItem';

function App() {
  return (
 		<ApplicationBody>
      <ApplicationHeader />
      <Navigation currentValue='currentmission' completedValue='completedmissions' reportsValue='reports'>
          <NavigationItem value="currentmission">
            <Text>Current mission is coming soon</Text>
          </NavigationItem>
          <NavigationItem value="completedmissions">
            <Text>Completed missions are coming soon</Text>
          </NavigationItem>
          <NavigationItem value="reports">
            <Text>Reports are coming soon</Text>
          </NavigationItem>
      </Navigation>
		</ApplicationBody>
  )
}

export default App

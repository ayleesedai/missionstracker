import { Text, Tabs, Box } from '@radix-ui/themes'
import ApplicationHeader from './layout/ApplicationHeader'
import './App.css';

function App() {
  return (
 		<div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
      <ApplicationHeader />
      <div style={{display: "flex", flex: 1, flexDirection: "column", overflow: "auto", background: "var(--gray-a2)", padding: "10px" }}>
			<Tabs.Root defaultValue="currentmission">
        <Tabs.List size="2">
          <Tabs.Trigger value="currentmission">Current Mission</Tabs.Trigger>
          <Tabs.Trigger value="completedmissions">Completed Missions</Tabs.Trigger>
          <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="currentmission">
            <Text size="2">Make changes to your current mission.</Text>
          </Tabs.Content>

          <Tabs.Content value="completedmissions">
            <Text size="2">Access and update your Completed Missions.</Text>
          </Tabs.Content>

          <Tabs.Content value="reports">
            <Text size="2">Edit your profile or update contact information.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
      </div>
		</div>
  )
}

export default App

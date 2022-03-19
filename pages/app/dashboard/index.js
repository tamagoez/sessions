import NavBar from '~/components/NavBar'
const Dashboard = () => {
  return (
    <div>
      {process.browser ? <NavBar /> : console.log('Ignored NavBar')}
      <p>This is dashboard.(?!?!)</p>
    </div>
  )
}

export default Dashboard;

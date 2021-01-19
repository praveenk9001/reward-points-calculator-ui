import RewardsTable from './RewardsTable';
import {useEffect, useState} from 'react';
import axios from 'axios';
import CustomerSelection from './CustomerSelection';

function App() {
  const [customers, setCustomers] = useState([]);
  const [monthList] = useState([{id: 1,value: 'January'},{id:2, value: 'February'},{id:3, value: 'March'}]);
  const [yearList] = useState([{id: 2019, value: '2019'}, {id: 2020, value: '2020'}]);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [rewards, setRewards] = useState([]);
	const [totalRewards, setTotalRewards] = useState(0);

  function fetchCustomers() {
    if (selectedCustomer && selectedMonth && selectedYear) {
			axios
				.get(`http://localhost:9090/rewardPoints/customer/${selectedCustomer}/${selectedYear}/${selectedMonth}`)
				.then(resp => {
					setRewards(resp.data.transactions);
					setTotalRewards(resp.data.totalRewardPoints);
				});
		}
  }

  useEffect(() => {
    axios
      .get("http://localhost:9090/rewardPoints/customers")
      .then(resp => {
        setCustomers(resp.data);
      })
  }, []);

  return (
    <div className="App d-flex flex-column align-items-center">
      <div className="container">
        <header className="mt-3 text-center">
          <h1>Welcome To Customer Reward Points Calculator</h1>
          <hr />
        </header>
        <div className="row">
          <div className="col my-5">
            <CustomerSelection 
              customers={customers} 
              monthList={monthList} 
              yearList={yearList} 
              setSelectedCustomer={setSelectedCustomer} 
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              fetchCustomers={fetchCustomers}
            />
          </div>
        </div>
        <div className="row">
          <div className="col mt-5">
            <RewardsTable 
              rewards={rewards} 
              totalRewards={totalRewards}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

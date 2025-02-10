const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			cohorte: 'Luis Borjas',
			users:[],
			user: {},
			isLogged: false,
			baseURLContact: "https://playground.4geeks.com/contact",
			contacts: [],
			currentContact: {},
			alert: {text: '', background: 'primary', visible: false}
			},
		actions: {
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setUser: (currentUser) => { setStore({ user: currentUser }) },
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setCurrentContact: (item) => {setStore({currentContact: item})},
			setAlert: (newAlert) => setStore({alert: newAlert}),
			login: async (dataToSend) => {
				console.log(dataToSend);
				const uri = `${process.env.BACKEND_URL}/api/login`;
				console.log(uri)
				const options = {
					method: 'POST',
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)					
				};
				const response = await fetch(uri, options);
				if (!response.ok){
					console.log('Error', response.status, response.statusText);
					if (response.status == 401){
						console.log('en el error 401');
						setStore({alert:{text:'Email o contraseña no valido', background: 'danger', visible: true}})
					}
					return
				}
				const data = await response.json()
				localStorage.setItem('token', data.access_token)
				setStore({
					isLogged: true,
					user: data.results,
				})
			},
			getUser: async (userId) =>{
				const uri = `${process.env.BACKEND_URL}/api/users/${userId}`;
				const options = {
					method: 'GET',
					headers:{
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok){
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()
				console.log(data)
			},
			accessProtected: async () =>{
				const uri = `${process.env.BACKEND_URL}/api/protected`;
				const options = {
					method: 'GET',
					headers:{
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				}
				const response = await fetch(uri, options);
				if (!response.ok){
					console.log('Error', response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({alert:{text: data.message, background: 'success', visible: true}})
			},
			getContacts: async () => {
				// GET
				const uri = `https://playground.4geeks.com/contact`;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText)
					return
				}
				const data = await response.json();
				setStore({ contacts: data.contacts })
			},
			addContact : async (newData) => {
				// POST
				const uri = `https://playground.4geeks.com/contact/agendas/alex22bo/contacts`
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newData)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					//tratamos el error
					console.log('error:', response.status, response.statusText)
					return
				}
				getActions().getContacts()
			},
			editContact : async (dataContact, id) => {
				// PUT	
				const uri = `https://playground.4geeks.com/contact/agendas/alex22bo/contacts/${id}`;						
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataContact)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					//tratamos el error
					console.log('error:', response.status, response.statusText)
					return
				}
				getActions().getContacts();
				getActions().setCurrentContact({})				
			},
			deleteContact: async (id) => {
				//DELETE
				const uri = `https://playground.4geeks.com/contact/agendas/alex22bo/contacts/${id}`
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error:', response.status, response.statusText)
					return
				}
				getActions().getContacts();
			}
		}
	};
};

export default getState;

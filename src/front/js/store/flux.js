const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			cohorte: 'Luis Borjas',
			isLogged: false,
			baseURLContact: "https://playground.4geeks.com/contact",
			contacts: [],
			user: "alex22bo",
			currentContact: {}
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
			getContacts: async () => {
				// GET
				const uri = `${getStore().baseURLContact}/agendas/${getStore().user}/contacts`;
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

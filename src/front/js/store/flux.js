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
			currentContact: {},
			baseURLStarWars: "https://www.swapi.tech/api",
			dataCharacters: [],
			currentCharacterDetail: {},
			dataPlanets: [],
			currentPlanetDetail: {},
			dataStarships: [],
			currentStarshipDetail: {}
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
			},
			getCharacters: async () => {
				const store = getStore();
				const storedCharacters = localStorage.getItem("dataCharacters");
				if(storedCharacters){
					setStore({dataCharacters: JSON.parse(storedCharacters)});
					return
				}
                const uri = `${store.baseURLStarWars}/people`;
                const swapiResponse = await fetch(uri);
                if (!swapiResponse.ok) {
                    console.log('Error:', swapiResponse.status, swapiResponse.statusText);
                    return;
                }
                const swapiData = await swapiResponse.json();

				const  akababUri = "https://akabab.github.io/starwars-api/api/all.json";
				const akababResponse = await fetch( akababUri);
				if(!akababResponse.ok){
					console.log('Error:', akababResponse.status, akababResponse.statusText);
                    return;
				}
				const akababData = await akababResponse.json();
				const mergedCharacters = swapiData.results.map(character => {
					const id = parseInt(character.uid);
					const akababObj = akababData.find(item => item.id === id);
					return{
						...character,
						image:akababObj ? akababObj.image : "https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg"
					}
				});
                setStore({ dataCharacters: mergedCharacters });
				localStorage.setItem("dataCharacters", JSON.stringify(mergedCharacters));
			},
			getCharactersImage: (uid) => {
				const store = getStore();
				const character = store.dataCharacters.find(item => item.uid === uid);
				return character ? character.image : "https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg"

			},			
			getCharacterDetails: async (uid) => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/people/${uid}`;
				const response = await fetch (uri)
				if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
				const data = await response.json();
				setStore({ currentCharacterDetail: data.result.properties });
			},
			clearCharactersStorage: () => {
				localStorage.removeItem("dataCharacters");
				setStore({ dataCharacters: [] });
			},
			getStarShips: async () => {
				const store = getStore();
				const storedStarships = localStorage.getItem("dataStarships");
				if(storedStarships){
					setStore({dataStarships: JSON.parse(storedStarships)});
					return
				}
                const uri = `${store.baseURLStarWars}/starships`;
                const response = await fetch(uri);
                if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ dataStarships: data.results });
				localStorage.setItem("dataStarships", JSON.stringify(data.results));				
            },
			getStarShipDetails: async (uid) =>{
				const store = getStore();
				const uri = `${store.baseURLStarWars}/starships/${uid}`;
				const response = await fetch (uri)
				if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
				const data = await response.json();
				setStore({ currentStarshipDetail: data.result.properties });

			},
			clearStarshipsStorage: () => {
				localStorage.removeItem("dataStarships");
				setStore({ dataStarships: [] });
			},
			getPlanets: async () => {
				const store = getStore();
				const storedPlanets = localStorage.getItem("dataPlanets");
				if (storedPlanets) {
					setStore({ dataPlanets: JSON.parse(storedPlanets) });
					return
				}
                const uri = `${store.baseURLStarWars}/planets`;
                const response = await fetch(uri);
                if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
                const data = await response.json();
                setStore({ dataPlanets: data.results });
				localStorage.setItem("dataPlanets", JSON.stringify(data.results));
            },
			getPlanetDetails: async(uid) => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/planets/${uid}`;
				const response = await fetch (uri)
				if (!response.ok) {
                    console.log('Error:', response.status, response.statusText);
                    return;
                }
				const data = await response.json();
				console.log(data)
				setStore({ currentPlanetDetail: data.result.properties });
			},
			clearPlanetsStorage: () => {
				localStorage.removeItem("dataPlanets");
				setStore({ dataPlanets: [] });
			}
		}
	};
};

export default getState;

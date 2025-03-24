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
			alert: {text: '', background: 'primary', visible: false},
			baseURLStarWars: "https://www.swapi.tech/api",
			//Characters
			dataCharacters: [],
			charactersNext: null,
			charactersPrevious: null,
			charactersTotalPages: null,
			currentCharacterDetail: {},
			//Planets
			dataPlanets: [],
			currentPlanetDetail: {},
			planetsNext: null,
    		planetsPrevious: null,
			//Starships
			dataStarships: [],
			currentStarshipDetail: {},
			starshipsNext: null,
    		starshipsPrevious: null,
			favorites: [],
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
			setCurrentContact: (item) => { setStore({ currentContact: item }) },
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
			addContact: async (newData) => {
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
			editContact: async (dataContact, id) => {
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
			getCharacters: async (page = 1) => {
				try {
					const store = getStore();
					const uri = `${store.baseURLStarWars}/people?page=${page}`;
					const response = await fetch(uri)
					if (!response.ok) {
						console.log("Error en la optención de personajes:", response.statusText);
						return;
					}
					const swapiData = await response.json();
					const akababRes = await fetch("https://akabab.github.io/starwars-api/api/all.json");
					const akababData = await akababRes.json();

					const mergedCharacters = swapiData.results.map(character => {
						const id = parseInt(character.uid, 10);
						const match = akababData.find(item => item.id === id);
						return {
							...character,
							image: match
								? match.image
								: "https://user-images.githubusercontent.com/5948318/38711580-ea19e088-3e9c-11e8-9a02-6b46805f311d.png"
						};
					});
					setStore({
						dataCharacters: mergedCharacters,
						charactersTotalPages: swapiData.total_pages,
						charactersNext: swapiData.next,       // URL de la siguiente página
						charactersPrevious: swapiData.previous // URL de la página anterior
					});
					localStorage.setItem("dataCharacters", JSON.stringify(mergedCharacters));
				} catch (error) {
					console.error("Error en obtener personajes:", error);
				}
			},
			getCharactersImage: (uid) => {
				const store = getStore();
				const character = store.dataCharacters.find(item => item.uid === uid);
				return character ? character.image : 
				"https://user-images.githubusercontent.com/5948318/38711580-ea19e088-3e9c-11e8-9a02-6b46805f311d.png"

			},
			getCharacterDetails: async (uid) => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/people/${uid}`;
				const response = await fetch(uri)
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
			navigateCharacters: async(url) => {
				if(!url) return;
				try{
					const response = await fetch(url);
					if(!response.ok){
						console.log ("Error:", response.statusText);
						return;
					}
					const swapiData = await response.json();
					const akababRes = await fetch("https://akabab.github.io/starwars-api/api/all.json");
					const akababData = await akababRes.json();
					const mergedCharacters = swapiData.results.map(character => {
						const id = parseInt(character.uid, 10);
						const match = akababData.find(item => item.id === id);
						return {
							...character,
							image: match
								? match.image
								: "https://user-images.githubusercontent.com/5948318/38711580-ea19e088-3e9c-11e8-9a02-6b46805f311d.png"
						};
					});
					setStore({
						dataCharacters: mergedCharacters,
						charactersTotalPages: swapiData.total_pages,
						charactersNext: swapiData.next,      
						charactersPrevious: swapiData.previous
					});
					localStorage.setItem("dataCharacters", JSON.stringify(mergedCharacters));
				}catch(error){
					console.log("Error:", error);
				}
			},
			getStarShips: async () => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/starships`;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}
				const swapiData = await response.json();
				const starships = swapiData.results.map(ship => ({
					...ship,
					image: "https://llerena.org/wp-content/uploads/2017/11/imagen-no-disponible-1.jpg"
				}));
				setStore({
					dataStarships: starships,
					starshipsNext: swapiData.next,
					starshipsPrevious: swapiData.previous
				});
				localStorage.setItem("dataStarships", JSON.stringify(starships));
			},
			getStarShipDetails: async (uid) => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/starships/${uid}`;
				const response = await fetch(uri)
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
			navigateStarships: async (url) => {
				if (!url) return;
				try {
					const response = await fetch(url);
					if (!response.ok) {
						console.log("Error:", response.statusText);
						return;
					}
					const swapiData = await response.json();
					const starships = swapiData.results.map(ship => ({
						...ship,
						image: "https://user-images.githubusercontent.com/5948318/38711585-ef6a8970-3e9c-11e8-96c7-fc8a610cdde2.png" // o imagen dinámica
					}));			
					setStore({
						dataStarships: starships,
						starshipsNext: swapiData.next,
						starshipsPrevious: swapiData.previous
					});			
					localStorage.setItem("dataStarships", JSON.stringify(starships));
				} catch (error) {
					console.log("Error:", error);
				}
			},			
			getPlanets: async () => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/planets`;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText);
					return;
				}
				const swapiData = await response.json();
				const planets = swapiData.results.map(planet => ({
					...planet,
					image: "https://user-images.githubusercontent.com/5948318/38711585-ef6a8970-3e9c-11e8-96c7-fc8a610cdde2.png"
				}));
				setStore({
					dataPlanets: planets,
					planetsNext: swapiData.next,
					planetsPrevious: swapiData.previous
				});
				localStorage.setItem("dataPlanets", JSON.stringify(planets));
			},
			getPlanetDetails: async (uid) => {
				const store = getStore();
				const uri = `${store.baseURLStarWars}/planets/${uid}`;
				const response = await fetch(uri)
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
			},
			navigatePlanets: async (url) => {
				if (!url) return;
				try {
					const response = await fetch(url);
					if (!response.ok) {
						console.log("Error:", response.statusText);
						return;
					}
					const swapiData = await response.json();
			
					const planets = swapiData.results.map(planet => ({
						...planet,
						image: "https://user-images.githubusercontent.com/5948318/38711585-ef6a8970-3e9c-11e8-96c7-fc8a610cdde2.png" // o una URL dinámica si se tiene
					}));
			
					setStore({
						dataPlanets: planets,
						planetsNext: swapiData.next,
						planetsPrevious: swapiData.previous
					});
			
					localStorage.setItem("dataPlanets", JSON.stringify(planets));
				} catch (error) {
					console.log("Error:", error);
				}
			},
			addFavorite: async (item) => {
				const store = getStore();
				const exists = store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);
				let newFavorites;
				if (!exists) {
					newFavorites = [...store.favorites, item];
				} else {
					newFavorites = store.favorites;
				}
				setStore({ favorites: newFavorites });
				localStorage.setItem("favorites", JSON.stringify(newFavorites));
			},
			deleteFavorite: (uid) => {
				const store = getStore();
				const newFavorites = store.favorites.filter(fav => fav.uid !== uid);
				setStore({ favorites: newFavorites });
				localStorage.setItem("favorites", JSON.stringify(newFavorites));
				return true;
			}
		}
	};
};

export default getState;

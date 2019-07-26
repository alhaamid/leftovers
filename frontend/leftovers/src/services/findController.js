import axios from 'axios';

class findController {
    constructor () {
        this.backendUrl = 'http://localhost:4201';
        // 'https://jsonplaceholder.typicode.com/users'
    }

    getAvailableListings() {
        const url = `${this.backendUrl}/listing`;
        return new Promise ((resolve, reject) => {
            axios.get(url)
            .then(res => {
                resolve(res.data);
            })
            .catch(rej => reject(rej))
        })
    }

    search (searchQuery) {
        const url = `${this.backendUrl}/listing/search/?q=${searchQuery}`;
        return new Promise ((resolve, reject) => {
            axios.get(url)
            .then(res => { resolve(res.data); })
            .catch(rej => reject(rej))
        });
    }

    postListing(listingJSON) {
        const url = `${this.backendUrl}/listing`;
        return new Promise((resolve, reject) => {
            axios.post(url, listingJSON)
            .then(res => { resolve(res.data) })
            .catch(rej => reject(rej))
        });
    }
}

export default findController;

// [
//     {
//       imageUrl: "airpods.jpeg",
//       location: "8F",
//       title: "airpods",
//       description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
//     },
//     {
//       imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51z376z5iBL._SL1200_.jpg",
//       location: "8F",
//       title: "airpods",
//       description: "These are MY headphones!",
//     },
// ]
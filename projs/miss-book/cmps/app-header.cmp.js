
export default {
    template: `
       <header class="app-header">
           <h1 class="app-title">Miss Book</h1>
           <nav>
                <router-link class="routerLink-nav" to="/">Home</router-link> |
                <router-link class="routerLink-nav" to="/book">Book App</router-link> | 
                <router-link class="routerLink-nav" to="/about">About</router-link> 
            </nav>
       </header>
    `,
}
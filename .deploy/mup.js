module.exports = {
  servers: {
    one: {
      host: '159.203.231.13',
      username: 'root',
      pem: "~/.ssh/id_rsa"
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },
  meteor: {
    name: 'app',
    path: '../',
    docker: {
      image:'abernix/meteord:base'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://159.203.231.13',
      MONGO_URL: 'mongodb://santistebanc:atgmatgm@ds053469.mlab.com:53469/forkappdb'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 300
  }
};

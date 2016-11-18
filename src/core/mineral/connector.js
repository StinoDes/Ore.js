const connector = flush => element => {

  const data        = {},
    dirty           = {},
    apply           = config => {
      Object.keys(config).forEach(key => dirty[key] = config[key])
      if (flush(element, dirty))
        Object.keys(dirty).forEach(key => data[key] = dirty[key])
      else
        console.warn('Connector\'s flush did not return true.')
    },
    connectorApi    = (config = false) => {
      if (!config)
        return data
      apply(config)
      return connectorApi
    }

    connectorApi.isConnector = () => true

    return connectorApi
}

export default connector
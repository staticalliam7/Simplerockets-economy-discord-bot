module.exports = {
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'say': {
    aliases: ['repeat'],
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'stocks' : {
    aliases: ['none'],
    description: 'Up to date info on the market',
    format: 'stocks'
  }
}
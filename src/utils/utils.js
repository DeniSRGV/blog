export const sortTime = (time) => {
  const t = new Date(time)
  const str = `${t.toLocaleString('it-IT', {
    month: 'long'
  })} ${t.getDate()}, ${t.getFullYear()}`
  return str[0].toUpperCase() + str.slice(1)
}

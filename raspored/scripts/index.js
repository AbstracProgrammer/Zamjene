const params = new URLSearchParams(window.location.search);
const absent = JSON.parse(params.get("absent"));
console.log(absent);
/**
 * IDEJA ZA OVE KLIKOVE
 *
 * ako kliknes npr. Ponedjeljak, on sam po sebi neće dobiti kao oznaku da je kliknut
 * nego on ce onda kliknute sve sve pomocu element.click()
 *
 * ista stvar vrijedi za cijelu tablicu
 */

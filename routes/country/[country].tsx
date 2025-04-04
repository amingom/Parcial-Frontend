import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  country: string,
  capital: string
}

type Country = {
  capital: string
}[]

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const country = ctx.params.country;
    const API_KEY = Deno.env.get("API_KEY");

    if (!API_KEY) {
      throw new Error("No hay API_KEY");
    }

    const url = `https://api.api-ninjas.com/v1/country?name=${country}`;
    const data = await fetch(url,
    {
      headers: {
        "X-Api-Key": API_KEY,
      }
      })
    
    const response: Country = await data.json();
    const capital = response[0].capital;

    return ctx.render({country, capital})
      
    },
}

export default function Page(props: PageProps<Data>) {
  return (
    <div>
      <h1>{props.data.country}</h1>
      <a href={`/city/${props.data.capital}`}>{props.data.capital}</a>
    </div>
  )
}
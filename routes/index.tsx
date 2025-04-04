import Form from "../components/Form.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  telefono?: string;
  country?: string;
};

type ValidacionTelefono = {
  is_valid: boolean;
  country: string;
};

export const handler: Handlers = {
  async GET(req: Request, ctx: FreshContext) {
    const url = new URL(req.url);
    const telefono = url.searchParams.get("telefono");

    const API_KEY = Deno.env.get("API_KEY");

    if (!API_KEY) {
      throw new Error("No hay API_KEY");
    }

    let country;
    if (telefono) {
      const apiUrl = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`
      const response = await fetch( apiUrl,  
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });
      const data: ValidacionTelefono = await response.json();
      country = data.country;
    }
    return ctx.render({telefono, country})
  },
};

export default function Home(props: PageProps<Data>) {
  return (
    <div class="content">
      <Form />
      <div class="telefono">
        {props.data.telefono && <p>Número de teléfono: {props.data.telefono}</p>}
        {props.data.country && (
        <a href={`/country/${props.data.country}`}>País: {props.data.country}</a>
        )}
      </div>
    </div>
  );
}

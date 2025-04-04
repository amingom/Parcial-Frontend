const Form = () => {
  return (
    <>
      <form method="GET" action="/" class="form">
        <input type="text" name="telefono" value="" placeholder= "Telefono" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Form;
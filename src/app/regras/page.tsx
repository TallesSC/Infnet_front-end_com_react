import styles from './regras.module.scss';

export default function Regras() {
  return (
    <section className={styles.rules}>
      <div className="container">
        <h1 className={styles.title}>Regras</h1>
        <div className={styles.text}>
          <p>Descubra a palavra certa em 6 tentativas. Depois de cada tentativa, as peças mostram o quão perto você está da solução.</p>
          <p>Os acentos são preenchidos automaticamente, e não são considerados nas dicas.</p>
          <p>As palavras podem possuir letras repetidas.</p>
          <p>Uma palavra nova aparece a cada dia.</p>
        </div>
      </div>
    </section>
  );
}
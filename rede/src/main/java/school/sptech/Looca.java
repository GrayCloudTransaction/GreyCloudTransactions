package school.sptech;

import com.github.britooo.looca.api.group.rede.RedeInterface;
public class Looca {
    private final RedeInterface redeInterface;

    public Looca(RedeInterface redeInterface) {
        this.redeInterface = redeInterface;
    }

    public RedeInterface getInterface() {
        return redeInterface;
    }

    @Override
    public String toString() {
        return "Looca{" +
                "redeInterface=" + redeInterface +

                '}';
    }
}

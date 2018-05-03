package no.nav.fo.forenkletdeploy.util;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.*;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class AsyncUtils {

    private static final ExecutorService EXECUTOR_SERVICE = Executors.newCachedThreadPool();

    public static <T> Future<T> async(Supplier<T> rSupplier) {
        return EXECUTOR_SERVICE.submit(rSupplier::get);
    }

    public static <T, R> Stream<R> asyncStream(Collection<T> collection, Function<T, R> asyncStream) {
        List<Future<R>> futures = collection.stream().map(
                t -> AsyncUtils.async(() -> asyncStream.apply(t))
        ).collect(toList()); // Må collecte, ellers submittes og resolves futures en etter en
        return futures.stream().map(AsyncUtils::get);
    }

    private static <R> R get(Future<R> future) {
        try {
            return future.get(1, TimeUnit.MINUTES);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

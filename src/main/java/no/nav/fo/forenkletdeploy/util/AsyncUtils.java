package no.nav.fo.forenkletdeploy.util;

import lombok.SneakyThrows;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
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

    @SneakyThrows
    private static <R> R get(Future<R> future) {
        return future.get(1, TimeUnit.MINUTES);
    }

}

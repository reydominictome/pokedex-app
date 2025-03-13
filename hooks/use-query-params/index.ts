import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = queryString.parse(searchParams.toString());

  const setQueryParams = (
    params: Record<string, any> | null,
    includeCurrentParams = false,
    replace = false
  ) => {
    const url = queryString.stringifyUrl({
      url: pathname,
      query: {
        ...(includeCurrentParams ? queryParams : {}),
        ...params,
      },
    });

    if (replace) {
      router.replace(url, {
        scroll: false,
      });
    } else {
      router.push(url, {
        scroll: false,
      });
    }
  };

  return { pathname, router, queryParams, setQueryParams };
};

export default useQueryParams;
